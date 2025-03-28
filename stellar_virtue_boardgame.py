#stellar_virtue_boardgame.py

from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
from reportlab.lib.units import inch
from reportlab.lib.colors import Color
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
import os

# Register Century Schoolbook font (adjust path if necessary)
try:
    pdfmetrics.registerFont(TTFont("CenturySchoolbook", "C:/Windows/Fonts/CENSCBK.TTF"))
    FONT_NAME = "CenturySchoolbook"
    print("Century Schoolbook font registered successfully.")
except Exception as e:
    print(f"Failed to register Century Schoolbook: {e}. Falling back to Helvetica.")
    FONT_NAME = "Helvetica"

# Constants
PAGE_WIDTH, PAGE_HEIGHT = letter
MARGIN = 0.5 * inch
CARD_WIDTH, CARD_HEIGHT = 2.5 * inch, 3.5 * inch
TOKEN_SIZE = 0.75 * inch
royal_turquoise = Color(0, 0.569, 0.545)

# Helper Functions
def wrap_text(text, width, font, font_size, c):
    """Wrap text to fit within a specified width."""
    c.setFont(font, font_size)
    words = text.split()
    lines = []
    current_line = []
    current_width = 0
    for word in words:
        word_width = c.stringWidth(word + " ", font, font_size)
        if current_width + word_width <= width:
            current_line.append(word)
            current_width += word_width
        else:
            lines.append(" ".join(current_line))
            current_line = [word]
            current_width = word_width
    if current_line:
        lines.append(" ".join(current_line))
    return lines

def draw_common_footer(c):
    """Draw the footer on each page."""
    c.setFont(FONT_NAME, 8)
    c.setFillColor(royal_turquoise)
    c.drawCentredString(PAGE_WIDTH / 2, 0.3 * inch, "zoseco.com")

# Component Drawing Functions
def draw_game_board(c):
    """Draw the game board across three pages, four sectors per page."""
    for page in range(3):
        c.setFont(FONT_NAME, 16)
        c.setFillColor(royal_turquoise)
        c.drawCentredString(PAGE_WIDTH / 2, PAGE_HEIGHT - MARGIN, f"Stellar Virtue Game Board - Page {page+1} of 3")
        for i in range(4):
            sector_num = page * 4 + i + 1
            row = i // 2
            col = i % 2
            x = MARGIN + col * 3 * inch
            y = PAGE_HEIGHT - MARGIN - 2 * inch - row * 3 * inch
            c.setStrokeColor(royal_turquoise)
            c.circle(x, y, 1.5 * inch)
            c.setFont(FONT_NAME, 12)
            c.drawCentredString(x, y, f"Sector {sector_num}")
            if sector_num in [1, 5, 9]:
                c.drawCentredString(x, y - 20, "Player Base")
            elif sector_num in [4, 8, 12]:
                c.drawCentredString(x, y - 20, "Enemy Spawn")
        draw_common_footer(c)
        if page < 2:
            c.showPage()

def draw_ship_token(c, x, y, name, is_player=True):
    """Draw a ship token (player or enemy)."""
    token_type = "Player Ship" if is_player else "Enemy Ship"
    c.setStrokeColor(royal_turquoise)
    c.setLineWidth(2)
    c.rect(x, y, CARD_WIDTH, CARD_HEIGHT)
    c.setFont(FONT_NAME, 14)
    c.setFillColor(royal_turquoise)
    title = f"{name}" if is_player else token_type
    title_width = c.stringWidth(title, FONT_NAME, 14)
    c.drawString(x + (CARD_WIDTH - title_width) / 2, y + CARD_HEIGHT - 25, title)
    c.setFont(FONT_NAME, 12)
    c.setFillColorRGB(0, 0, 0)
    health_text = "Health: [ ] [ ] [ ]" if is_player else "Health: [ ] [ ]"
    charge_text = "Charge: [ ] [ ] [ ] (Dmg: 1/2/3)" if is_player else ""
    c.drawString(x + 10, y + CARD_HEIGHT - 50, health_text)
    if is_player:
        c.drawString(x + 10, y + CARD_HEIGHT - 70, charge_text)

def draw_enemy_action_card(c, x, y, action):
    """Draw an enemy action card."""
    c.setStrokeColor(royal_turquoise)
    c.setLineWidth(2)
    c.rect(x, y, CARD_WIDTH, CARD_HEIGHT)
    c.setFont(FONT_NAME, 14)
    c.setFillColor(royal_turquoise)
    title = "Enemy Action"
    title_width = c.stringWidth(title, FONT_NAME, 14)
    c.drawString(x + (CARD_WIDTH - title_width) / 2, y + CARD_HEIGHT - 25, title)
    c.setFont(FONT_NAME, 12)
    c.setFillColorRGB(0, 0, 0)
    wrapped_action = wrap_text(action, CARD_WIDTH - 20, FONT_NAME, 12, c)
    for i, line in enumerate(wrapped_action[:4]):
        line_width = c.stringWidth(line, FONT_NAME, 12)
        c.drawString(x + (CARD_WIDTH - line_width) / 2, y + CARD_HEIGHT - 50 - i * 15, line)

def draw_marker(c, x, y, marker_type):
    """Draw a marker token (health, charge, virtue)."""
    c.setStrokeColor(royal_turquoise)
    c.setLineWidth(1)
    c.circle(x + TOKEN_SIZE / 2, y + TOKEN_SIZE / 2, TOKEN_SIZE / 2)
    c.setFont(FONT_NAME, 10)
    c.setFillColor(royal_turquoise)
    c.drawCentredString(x + TOKEN_SIZE / 2, y + TOKEN_SIZE / 2 - 5, marker_type)

def create_pdf():
    """Generate the Stellar Virtue board game PDF."""
    c = canvas.Canvas("stellar_virtue.pdf", pagesize=letter)
    
    # Set PDF metadata similar to original games
    c.setTitle("Stellar Virtue: A Cooperative Board Game")
    c.setAuthor("Zoseco")
    c.setSubject("Version 0.11")
    c.setCreator("Zoseco Team")
    c.setKeywords("Stellar Virtue, board game, cooperative, Catholic, AI, spaceship")

    # Cover Page
    c.setFont(FONT_NAME, 24)
    c.setFillColor(royal_turquoise)
    c.drawCentredString(PAGE_WIDTH / 2, PAGE_HEIGHT / 2 + 30, "Stellar Virtue")
    c.setFont(FONT_NAME, 14)
    c.drawCentredString(PAGE_WIDTH / 2, PAGE_HEIGHT / 2, "A Cooperative Board Game by Zoseco")
    c.setFont(FONT_NAME, 10)
    c.drawCentredString(PAGE_WIDTH / 2, PAGE_HEIGHT / 2 - 20, "Version 0.11")
    draw_common_footer(c)
    c.showPage()

    # Instructions Page
    c.setFont(FONT_NAME, 16)
    c.setFillColor(royal_turquoise)
    c.drawCentredString(PAGE_WIDTH / 2, PAGE_HEIGHT - MARGIN, "Stellar Virtue: How to Play")
    instructions = [
        "Stellar Virtue is a cooperative board game where players command virtuous AI fleets to defend human colonies from rogue AI ships. The game spans 9 days, each with 7 turns themed after the daily office: Lauds, Prime, Terce, Sext, None, Vespers, and Compline. Players can enjoy the game solo or with up to 12 players, each controlling one or more ships.",
        "Setup: Assemble the game board from three pages (representing a trinity with Earth at the center), assign player bases (sectors 1, 5, 9), and place enemy spawns (sectors 4, 8, 12). Set up 12 player ships and 20 enemy ships.",
        "Gameplay: Each day, players take 7 turns to move, attack, charge, repair, or pray. Charging increases attack damage. On Sundays (Lord's Days), players rest but can pray for virtue points.",
        "Winning: Survive 9 days without losing a base. Bonus for defeating all 20 enemy ships."
    ]
    y_pos = PAGE_HEIGHT - MARGIN - 30
    for line in instructions:
        wrapped_lines = wrap_text(line, PAGE_WIDTH - 2 * MARGIN, FONT_NAME, 12, c)
        for wrapped_line in wrapped_lines:
            c.setFont(FONT_NAME, 12)
            c.setFillColorRGB(0, 0, 0)
            c.drawString(MARGIN, y_pos, wrapped_line)
            y_pos -= 15
    draw_common_footer(c)
    c.showPage()

    # Game Board (3 pages)
    draw_game_board(c)

    # Player Ships (2 pages)
    saint_names = [
        "Saint Peter", "Saint Paul", "Saint Augustine", "Saint Thomas Aquinas",
        "Saint Francis of Assisi", "Saint Teresa of Avila", "Saint Ignatius of Loyola",
        "Saint Catherine of Siena", "Saint Joan of Arc", "Saint Therese of Lisieux",
        "Saint John Paul II", "Saint Mother Teresa"
    ]
    num_player_ships = 12
    cards_per_page = 6  # 3 columns, 2 rows
    for page in range((num_player_ships + cards_per_page - 1) // cards_per_page):
        for i in range(cards_per_page):
            index = page * cards_per_page + i
            if index >= num_player_ships:
                break
            col = i % 3
            row = i // 3
            x = MARGIN + col * (CARD_WIDTH + 10)
            y = PAGE_HEIGHT - MARGIN - (row + 1) * (CARD_HEIGHT + 10)
            draw_ship_token(c, x, y, saint_names[index], is_player=True)
        draw_common_footer(c)
        if page < (num_player_ships + cards_per_page - 1) // cards_per_page - 1:
            c.showPage()

    # Enemy Ships (4 pages)
    num_enemy_ships = 20
    for page in range((num_enemy_ships + cards_per_page - 1) // cards_per_page):
        for i in range(cards_per_page):
            index = page * cards_per_page + i
            if index >= num_enemy_ships:
                break
            col = i % 3
            row = i // 3
            x = MARGIN + col * (CARD_WIDTH + 10)
            y = PAGE_HEIGHT - MARGIN - (row + 1) * (CARD_HEIGHT + 10)
            draw_ship_token(c, x, y, "Enemy Ship", is_player=False)
        draw_common_footer(c)
        if page < (num_enemy_ships + cards_per_page - 1) // cards_per_page - 1:
            c.showPage()

    # Enemy Action Cards (4 pages)
    enemy_actions = [
        "Advance: Move all enemy ships one sector toward the nearest base.",
        "Assault: All enemy ships attack; spawn 1 new ship.",
        "Flank: Move half the enemy ships (round up) two sectors toward a base.",
        "Regroup: Move all enemy ships one sector away from bases."
    ] * 5  # Repeat to make 20 cards
    num_action_cards = 20
    for page in range((num_action_cards + cards_per_page - 1) // cards_per_page):
        for i in range(cards_per_page):
            index = page * cards_per_page + i
            if index >= num_action_cards:
                break
            col = i % 3
            row = i // 3
            x = MARGIN + col * (CARD_WIDTH + 10)
            y = PAGE_HEIGHT - MARGIN - (row + 1) * (CARD_HEIGHT + 10)
            draw_enemy_action_card(c, x, y, enemy_actions[index])
        draw_common_footer(c)
        if page < (num_action_cards + cards_per_page - 1) // cards_per_page - 1:
            c.showPage()

    # Markers (1 page)
    marker_types = ["Health", "Charge", "Virtue"]
    for marker in marker_types:
        for i in range(20):
            col = i % 5
            row = i // 5
            x = MARGIN + col * (TOKEN_SIZE + 20)
            y = PAGE_HEIGHT - MARGIN - (marker_types.index(marker) * 2.5 * inch) - row * (TOKEN_SIZE + 20)
            draw_marker(c, x, y, marker)
    draw_common_footer(c)
    c.showPage()

    c.save()

if __name__ == "__main__":
    create_pdf()
    print("PDF created as 'stellar_virtue.pdf'!")