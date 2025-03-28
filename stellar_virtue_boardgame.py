#stellar_virtue_boardgame.py
from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
from reportlab.lib.units import inch
from reportlab.lib.colors import Color
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
import os
import tempfile
import qrcode
import random

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
QR_SIZE = 1.5 * inch
royal_turquoise = Color(0, 0.569, 0.545)

# Helper Functions
def wrap_text(text, width, font, font_size, c, centered=False):
    """Wrap text to fit within a specified width, optionally centering it."""
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
    if centered:
        return [(line, c.stringWidth(line, font, font_size)) for line in lines]
    return lines

def create_qr_code(url):
    """Generate a QR code image from a URL and save it to a temporary file."""
    qr = qrcode.QRCode(version=1, box_size=10, border=1)
    qr.add_data(url)
    qr.make(fit=True)
    img = qr.make_image(fill_color="black", back_color="white")
    temp_file = tempfile.NamedTemporaryFile(delete=False, suffix=".png")
    img.save(temp_file.name)
    return temp_file.name

def draw_qr_with_label(c, url, label, x, y):
    """Draw a QR code with a label above it, centered."""
    qr_file = create_qr_code(url)
    c.drawImage(qr_file, x, y, QR_SIZE, QR_SIZE)
    os.remove(qr_file)
    c.setFont(FONT_NAME, 14)
    c.setFillColor(royal_turquoise)
    label_width = c.stringWidth(label, FONT_NAME, 14)
    c.drawString(x + (QR_SIZE - label_width) / 2, y + QR_SIZE + 0.1 * inch, label)

def draw_common_footer(c):
    """Draw a simple footer with the website on every page."""
    c.setFont(FONT_NAME, 8)
    c.setFillColor(royal_turquoise)
    c.drawCentredString(PAGE_WIDTH / 2, 0.3 * inch, "zoseco.com")

# Component Drawing Functions
def draw_game_board(c):
    """Draw the hexagonal grid game board with 12 sectors."""
    c.setFont(FONT_NAME, 16)
    c.setFillColor(royal_turquoise)
    c.drawCentredString(PAGE_WIDTH / 2, PAGE_HEIGHT - MARGIN, "Stellar Virtue Game Board")
    
    # Draw hexagonal grid (simplified as circles for sectors)
    sector_radius = 1.0 * inch
    for i in range(12):
        row = i // 4
        col = i % 4
        x = MARGIN + col * 2.5 * inch
        y = PAGE_HEIGHT - MARGIN - 2.5 * inch - row * 2.5 * inch
        c.circle(x, y, sector_radius)
        c.setFont(FONT_NAME, 12)
        c.drawCentredString(x, y, f"Sector {i+1}")
    
    draw_common_footer(c)

def draw_ship_token(c, x, y, is_player=True):
    """Draw a ship token with health and charge trackers."""
    token_type = "Player Ship" if is_player else "Enemy Ship"
    c.setStrokeColor(royal_turquoise)
    c.setLineWidth(2)
    c.rect(x, y, CARD_WIDTH, CARD_HEIGHT)
    
    c.setFont(FONT_NAME, 14)
    c.setFillColor(royal_turquoise)
    title = f"{token_type} Token"
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
    """Generate the full Stellar Virtue PDF with all game components."""
    c = canvas.Canvas("stellar_virtue.pdf", pagesize=letter)
    c.setTitle("Stellar Virtue: A Cooperative Board Game")
    c.setAuthor("Zoseco")
    c.setSubject("A cooperative board game about virtue and spaceship combat")
    c.setCreator("Zoseco Team")
    c.setKeywords("Stellar Virtue, board game, cooperative, Catholic, AI, spaceship")
    
    # Page 1: Cover Page
    c.setFont(FONT_NAME, 24)
    c.setFillColor(royal_turquoise)
    c.drawCentredString(PAGE_WIDTH / 2, PAGE_HEIGHT / 2 + 30, "Stellar Virtue")
    c.setFont(FONT_NAME, 14)
    c.drawCentredString(PAGE_WIDTH / 2, PAGE_HEIGHT / 2, "A Cooperative Board Game by Zoseco")
    c.setFont(FONT_NAME, 10)
    c.drawCentredString(PAGE_WIDTH / 2, PAGE_HEIGHT / 2 - 20, "Version 1.0")
    draw_common_footer(c)
    c.showPage()
    
    # Page 2: Game Board
    draw_game_board(c)
    c.showPage()
    
    # Page 3-4: Player Ship Tokens
    for i in range(12):  # 12 player ships
        if i % 4 == 0 and i > 0:
            c.showPage()
            draw_common_footer(c)
        col = i % 2
        row = (i % 4) // 2
        x = MARGIN + col * (CARD_WIDTH + 20)
        y = PAGE_HEIGHT - MARGIN - (row + 1) * (CARD_HEIGHT + 20)
        draw_ship_token(c, x, y, is_player=True)
    c.showPage()
    draw_common_footer(c)
    
    # Page 5-6: Enemy Ship Tokens
    for i in range(20):  # 20 enemy ships
        if i % 4 == 0 and i > 0:
            c.showPage()
            draw_common_footer(c)
        col = i % 2
        row = (i % 4) // 2
        x = MARGIN + col * (CARD_WIDTH + 20)
        y = PAGE_HEIGHT - MARGIN - (row + 1) * (CARD_HEIGHT + 20)
        draw_ship_token(c, x, y, is_player=False)
    c.showPage()
    draw_common_footer(c)
    
    # Page 7-8: Enemy Action Cards
    enemy_actions = [
        "Advance: Move all enemy ships one sector toward the nearest base.",
        "Assault: All enemy ships attack; spawn 1 new ship.",
        "Flank: Move half the enemy ships (round up) two sectors toward a base.",
        "Regroup: Move all enemy ships one sector away from bases."
    ] * 5  # Repeat to make 20 cards
    for i, action in enumerate(enemy_actions):
        if i % 4 == 0 and i > 0:
            c.showPage()
            draw_common_footer(c)
        col = i % 2
        row = (i % 4) // 2
        x = MARGIN + col * (CARD_WIDTH + 20)
        y = PAGE_HEIGHT - MARGIN - (row + 1) * (CARD_HEIGHT + 20)
        draw_enemy_action_card(c, x, y, action)
    c.showPage()
    draw_common_footer(c)
    
    # Page 9: Markers
    marker_types = ["Health", "Charge", "Virtue"]
    for i, marker in enumerate(marker_types):
        for j in range(20):  # 20 markers per type
            col = j % 5
            row = j // 5
            x = MARGIN + col * (TOKEN_SIZE + 10)
            y = PAGE_HEIGHT - MARGIN - i * 1.5 * inch - row * (TOKEN_SIZE + 10)
            draw_marker(c, x, y, marker)
    draw_common_footer(c)
    c.showPage()
    
    # Page 10: Instructions
    c.setFont(FONT_NAME, 16)
    c.setFillColor(royal_turquoise)
    c.drawCentredString(PAGE_WIDTH / 2, PAGE_HEIGHT - MARGIN, "Stellar Virtue: How to Play")
    days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
    start_day = random.choice(days)
    instructions = [
        f"Stellar Virtue is a cooperative game where players command virtuous AI fleets to defend human colonies from rogue AI ships. The game lasts 9 days, starting on {start_day}, with each day offering 7 turns (except Sundays, which are special).",
        "Setup: Place the game board, assign player bases, and set up ships and markers. Randomly determine the start day (e.g., roll a die or draw a card).",
        "Gameplay: Each day, players take 7 turns to move, attack, charge, repair, or pray. Charging increases attack damage (e.g., 1 charge = 2 damage, 2 charges = 3 damage). On Sundays (Lord's Days), players rest—no moving or attacking—but may pray to gain virtue points or use them for special abilities, making it a day of renewal.",
        f"Cycle: Starting on {start_day}, play 9 consecutive days. If {start_day} is early in the week, you may encounter two Sundays, enhancing strategic depth.",
        "Winning: Survive all 9 days without any base destroyed. Bonus for defeating 20 enemy ships."
    ]
    y_pos = PAGE_HEIGHT - MARGIN - 30
    for line in instructions:
        wrapped_lines = wrap_text(line, PAGE_WIDTH - 2 * MARGIN, FONT_NAME, 12, c)
        for wrapped_line in wrapped_lines:
            c.drawString(MARGIN, y_pos, wrapped_line)
            y_pos -= 15
    draw_common_footer(c)
    c.showPage()
    
    c.save()

if __name__ == "__main__":
    create_pdf()
    print("PDF created as 'stellar_virtue.pdf'!")