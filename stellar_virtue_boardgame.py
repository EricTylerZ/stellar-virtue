# stellar_virtue_boardgame.py

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
CARD_SPACING = 0.1 * inch
SECTOR_SPACING = 2.75 * inch  # Increased from 2.5" for gap between circles
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
    """Draw the game board across three pages, four centered sectors per page with Earth on page 1."""
    for page in range(3):
        c.setFont(FONT_NAME, 16)
        c.setFillColor(royal_turquoise)
        c.drawCentredString(PAGE_WIDTH / 2, PAGE_HEIGHT - MARGIN, f"Stellar Virtue Game Board - Page {page+1} of 3")
        
        # Earth on page 1 (top center)
        if page == 0:
            earth_x = PAGE_WIDTH / 2
            earth_y = PAGE_HEIGHT - MARGIN - 1.0 * inch
            c.setStrokeColor(royal_turquoise)
            c.circle(earth_x, earth_y, 0.75 * inch)
            c.setFont(FONT_NAME, 12)
            c.drawCentredString(earth_x, earth_y, "Earth")
        
        # Sectors (2x2 grid, centered below Earth or title)
        for i in range(4):
            sector_num = page * 4 + i + 1
            row = i // 2
            col = i % 2
            x = MARGIN + 1.25 * inch + col * SECTOR_SPACING  # 0.5 + 1.25 = 1.75, +2.75 = 4.5
            y = PAGE_HEIGHT - MARGIN - 2.0 * inch - 1.25 * inch - row * SECTOR_SPACING  # 11 - 0.5 - 2 - 1.25 = 7.25, -2.75 = 4.5
            c.setStrokeColor(royal_turquoise)
            c.circle(x, y, 1.25 * inch)
            c.setFont(FONT_NAME, 12)
            c.drawCentredString(x, y, f"Sector {sector_num}")
            if sector_num in [1, 5, 9]:
                c.drawCentredString(x, y - 20, "Player Base")
            elif sector_num in [4, 8, 12]:
                c.drawCentredString(x, y - 20, "Enemy Spawn")
        draw_common_footer(c)
        c.showPage()

def draw_card(c, x, y, title, text):
    """Draw a generic card (used for saint ships, enemy ships, action cards)."""
    c.setStrokeColor(royal_turquoise)
    c.setLineWidth(2)
    c.rect(x, y, CARD_WIDTH, CARD_HEIGHT)
    c.setFont(FONT_NAME, 14)
    c.setFillColor(royal_turquoise)
    title_width = c.stringWidth(title, FONT_NAME, 14)
    c.drawString(x + (CARD_WIDTH - title_width) / 2, y + CARD_HEIGHT - 25, title)
    c.setFont(FONT_NAME, 12)
    c.setFillColorRGB(0, 0, 0)
    wrapped_text = wrap_text(text, CARD_WIDTH - 20, FONT_NAME, 12, c)
    for i, line in enumerate(wrapped_text[:4]):
        line_width = c.stringWidth(line, FONT_NAME, 12)
        c.drawString(x + (CARD_WIDTH - line_width) / 2, y + CARD_HEIGHT - 50 - i * 15, line)

def draw_token(c, x, y, token_type):
    """Draw a token (health, charge, virtue)."""
    c.setStrokeColor(royal_turquoise)
    c.setLineWidth(1)
    c.circle(x + TOKEN_SIZE / 2, y + TOKEN_SIZE / 2, TOKEN_SIZE / 2)
    c.setFont(FONT_NAME, 10)
    c.setFillColor(royal_turquoise)
    c.drawCentredString(x + TOKEN_SIZE / 2, y + TOKEN_SIZE / 2 - 5, token_type)

def create_pdf():
    """Generate the Stellar Virtue board game PDF."""
    c = canvas.Canvas("stellar_virtue.pdf", pagesize=letter)
    
    # Set PDF metadata
    c.setTitle("Stellar Virtue: A Cooperative Board Game")
    c.setAuthor("Zoseco")
    c.setSubject("Version 0.12")
    c.setCreator("Zoseco Team")
    c.setKeywords("Stellar Virtue, board game, cooperative, Catholic, AI, spaceship")

    # Cover Page
    c.setFont(FONT_NAME, 24)
    c.setFillColor(royal_turquoise)
    c.drawCentredString(PAGE_WIDTH / 2, PAGE_HEIGHT / 2 + 30, "Stellar Virtue")
    c.setFont(FONT_NAME, 14)
    c.drawCentredString(PAGE_WIDTH / 2, PAGE_HEIGHT / 2, "A Cooperative Board Game by Zoseco")
    c.setFont(FONT_NAME, 10)
    c.drawCentredString(PAGE_WIDTH / 2, PAGE_HEIGHT / 2 - 20, "Version 0.12")
    draw_common_footer(c)
    c.showPage()

    # Instructions Page
    c.setFont(FONT_NAME, 16)
    c.setFillColor(royal_turquoise)
    c.drawCentredString(PAGE_WIDTH / 2, PAGE_HEIGHT - MARGIN, "Stellar Virtue: How to Play")
    instructions = [
        "Stellar Virtue is a cooperative board game where players command virtuous AI fleets to defend human colonies from rogue AI ships. The game spans 9 days, each with 7 turns themed after the daily office: Lauds, Prime, Terce, Sext, None, Vespers, and Compline. Players can enjoy the game solo or with up to 12 players, each controlling one or more ships.",
        "Setup: Assemble the game board from three pages (representing a trinity with Earth at the center), assign player bases (sectors 1, 5, 9), and place enemy spawns (sectors 4, 8, 12). Set up 12 player ships and 24 enemy ships.",
        "Gameplay: Each day, players take 7 turns to move, attack, charge, repair, or pray. Charging increases attack damage. On Sundays (Lord's Days), players rest but can pray for virtue points.",
        "Winning: Survive 9 days without losing a base. Bonus for defeating all 24 enemy ships."
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

    # Turn Actions and Daily Office Page
    c.setFont(FONT_NAME, 16)
    c.setFillColor(royal_turquoise)
    c.drawCentredString(PAGE_WIDTH / 2, PAGE_HEIGHT - MARGIN, "Turn Actions and Daily Office")
    turn_actions = [
        "Each day consists of 7 turns, themed after the daily office:",
        "- Lauds: Morning prayer; gain 1 virtue point.",
        "- Prime: Plan your strategy; draw a Catholic Action Card.",
        "- Terce: Mid-morning; move or attack.",
        "- Sext: Noon; charge or repair.",
        "- None: Afternoon; pray or use a virtue ability.",
        "- Vespers: Evening; reflect and prepare for the next day.",
        "- Compline: Night; rest and heal 1 health per ship.",
        "Players can customize their turns or use this as a guide for thematic play."
    ]
    y_pos = PAGE_HEIGHT - MARGIN - 30
    for line in turn_actions:
        wrapped_lines = wrap_text(line, PAGE_WIDTH - 2 * MARGIN, FONT_NAME, 12, c)
        for wrapped_line in wrapped_lines:
            c.setFont(FONT_NAME, 12)
            c.setFillColorRGB(0, 0, 0)
            c.drawString(MARGIN, y_pos, wrapped_line)
            y_pos -= 15
    draw_common_footer(c)
    c.showPage()

    # Boilerplate Customization Page
    c.setFont(FONT_NAME, 16)
    c.setFillColor(royal_turquoise)
    c.drawCentredString(PAGE_WIDTH / 2, PAGE_HEIGHT - MARGIN, "Customization Page")
    customization_text = [
        "This page is for players to create their own custom cards, tokens, or rules. Use it to expand the game with your own ideas, such as new saint ships, enemy actions, or virtue abilities. Copy this page as needed to create more custom components."
    ]
    y_pos = PAGE_HEIGHT - MARGIN - 30
    for line in customization_text:
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

    # Saint Ships (2 pages, 6 per page)
    saint_names = [
        "Saint Peter", "Saint Paul", "Saint Augustine", "Saint Thomas Aquinas",
        "Saint Francis of Assisi", "Saint Teresa of Avila", "Saint Ignatius of Loyola",
        "Saint Catherine of Siena", "Saint Joan of Arc", "Saint Therese of Lisieux",
        "Saint John Paul II", "Saint Mother Teresa"
    ]
    for page in range(2):
        for i in range(6):
            index = page * 6 + i
            if index >= 12:
                break
            col = i % 3
            row = i // 3
            x = MARGIN + col * (CARD_WIDTH + CARD_SPACING)
            y = PAGE_HEIGHT - MARGIN - (row + 1) * (CARD_HEIGHT + CARD_SPACING)
            draw_card(c, x, y, saint_names[index], "Player Ship\nHealth: [ ] [ ] [ ]\nCharge: [ ] [ ] [ ] (Dmg: 1/2/3)")
        draw_common_footer(c)
        c.showPage()

    # Enemy Ships (4 pages, 6 per page)
    enemy_ships = ["Enemy Ship"] * 24  # 24 unique enemy ships
    for page in range(4):
        for i in range(6):
            index = page * 6 + i
            if index >= 24:
                break
            col = i % 3
            row = i // 3
            x = MARGIN + col * (CARD_WIDTH + CARD_SPACING)
            y = PAGE_HEIGHT - MARGIN - (row + 1) * (CARD_HEIGHT + CARD_SPACING)
            draw_card(c, x, y, f"Enemy Ship {index + 1}", "Health: [ ] [ ]")
        draw_common_footer(c)
        c.showPage()

    # Catholic Action Cards (4 pages, 6 per page)
    catholic_actions = [
        "Pray the Rosary: Gain 2 virtue points.",
        "Act of Charity: Heal all ships in one sector by 1 health.",
        "Confession: Remove one enemy ship from the board.",
        "Fast: Skip a turn to gain 3 virtue points.",
        "Almsgiving: Donate virtue points to another player.",
        "Lectio Divina: Gain 1 virtue point and draw a card."
    ] * 4  # 24 unique actions
    for page in range(4):
        for i in range(6):
            index = page * 6 + i
            if index >= 24:
                break
            col = i % 3
            row = i // 3
            x = MARGIN + col * (CARD_WIDTH + CARD_SPACING)
            y = PAGE_HEIGHT - MARGIN - (row + 1) * (CARD_HEIGHT + CARD_SPACING)
            draw_card(c, x, y, "Catholic Action", catholic_actions[index % len(catholic_actions)])
        draw_common_footer(c)
        c.showPage()

    # Enemy Action Cards (4 pages, 6 per page)
    enemy_actions = [
        "Advance: Move all enemy ships one sector toward the nearest base.",
        "Assault: All enemy ships attack; spawn 1 new ship.",
        "Flank: Move half the enemy ships (round up) two sectors toward a base.",
        "Regroup: Move all enemy ships one sector away from bases.",
        "Ambush: Enemy ships in player sectors deal double damage.",
        "Reinforce: Spawn 2 new enemy ships in a spawn sector."
    ] * 4  # 24 unique actions
    for page in range(4):
        for i in range(6):
            index = page * 6 + i
            if index >= 24:
                break
            col = i % 3
            row = i // 3
            x = MARGIN + col * (CARD_WIDTH + CARD_SPACING)
            y = PAGE_HEIGHT - MARGIN - (row + 1) * (CARD_HEIGHT + CARD_SPACING)
            draw_card(c, x, y, "Enemy Action", enemy_actions[index % len(enemy_actions)])
        draw_common_footer(c)
        c.showPage()

    # Tokens (1 page, 5 columns, 4 rows per type)
    token_types = ["Health", "Charge", "Virtue"]
    c.setFont(FONT_NAME, 16)
    c.setFillColor(royal_turquoise)
    c.drawCentredString(PAGE_WIDTH / 2, PAGE_HEIGHT - MARGIN, "Tokens")
    for token_type in token_types:
        for i in range(20):
            col = i % 5
            row = i // 5
            x = MARGIN + col * (TOKEN_SIZE + 0.25 * inch)
            y = PAGE_HEIGHT - MARGIN - 1.5 * inch - (token_types.index(token_type) * 4 * (TOKEN_SIZE + 0.25 * inch)) - row * (TOKEN_SIZE + 0.25 * inch)
            draw_token(c, x, y, token_type)
    draw_common_footer(c)
    c.showPage()

    c.save()

if __name__ == "__main__":
    create_pdf()
    print("PDF created as 'stellar_virtue.pdf'!")