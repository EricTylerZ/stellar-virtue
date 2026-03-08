# stellar_virtue_boardgame.py
# Generates a printable PDF for Stellar Virtue board game components.
# Includes: board, ships, action cards, virtue question cards, moral choice cards,
# gift & fruit reference, and tokens.

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
SECTOR_SPACING = 2.75 * inch
royal_turquoise = Color(0, 0.569, 0.545)
dark_red = Color(0.545, 0, 0)

# ===== Virtue Data (matching virtues.js) =====

CARDINAL_VIRTUES = {
    'Prudence': ['Memory', 'Understanding', 'Docility', 'Shrewdness', 'Reason', 'Foresight', 'Circumspection', 'Caution'],
    'Justice': ['Religion', 'Devotion', 'Prayer', 'Piety', 'Patriotism', 'Gratitude', 'Truthfulness', 'Friendship', 'Liberality', 'Restitution', 'Distributive Justice', 'Commutative Justice', 'Epieikeia'],
    'Fortitude': ['Endurance', 'Patience', 'Magnanimity', 'Confidence', 'Perseverance', 'Daring'],
    'Temperance': ['Abstinence', 'Sobriety', 'Chastity', 'Continence', 'Humility', 'Meekness', 'Clemency', 'Modesty'],
}

GIFTS_OF_SPIRIT = [
    ('Wisdom', 'Perfects Charity', 'Judging all things in light of divine truth.'),
    ('Understanding', 'Perfects Faith', 'Penetrating comprehension of truths of faith.'),
    ('Counsel', 'Perfects Prudence', 'Supernatural intuition in difficult situations.'),
    ('Fortitude', 'Perfects Fortitude', 'Supernatural strengthening for practice of virtue.'),
    ('Knowledge', 'Perfects Faith', 'Understanding created things in relation to God.'),
    ('Piety', 'Perfects Justice', 'Loving reverence toward God and docility to grace.'),
    ('Fear of the Lord', 'Perfects Temperance', 'Filial awe before God\'s majesty.'),
]

FRUITS_OF_SPIRIT = [
    ('Charity', 'Selfless love for God and neighbor.'),
    ('Joy', 'Spiritual gladness rooted in God.'),
    ('Peace', 'Interior tranquility and harmony with God.'),
    ('Patience', 'Forbearance in difficulties.'),
    ('Kindness', 'Benevolence toward others.'),
    ('Goodness', 'Generosity and uprightness of heart.'),
    ('Generosity', 'Liberality in giving of self.'),
    ('Gentleness', 'Absence of harshness.'),
    ('Faithfulness', 'Fidelity and constancy.'),
    ('Modesty', 'Propriety and humble demeanor.'),
    ('Self-Control', 'Mastery over impulses.'),
    ('Chastity', 'Purity of heart and body.'),
]

# Sample virtue questions for print cards (a curated selection from virtues.js)
PRINT_VIRTUE_QUESTIONS = [
    ('Prudence - Memory', 'Memory as a sub-virtue of Prudence means:', 'A) Recalling past experiences to guide decisions\nB) Having a perfect memory\nC) Memorizing rules without understanding', 'A', 'Prudent memory applies lessons from the past.'),
    ('Prudence - Foresight', 'Foresight (providentia) means:', 'A) Predicting the future perfectly\nB) Anticipating consequences of present actions\nC) Worrying about what might happen', 'B', 'Foresight considers where our choices will lead.'),
    ('Prudence - Docility', 'Docility means:', 'A) Being obedient without thinking\nB) Never questioning authority\nC) Willingness to be taught and take counsel', 'C', 'Docility is openness to learning from the wise.'),
    ('Justice - Religion', 'Religion as a sub-virtue of Justice means:', 'A) Following rules mechanically\nB) Rendering to God the worship due to Him\nC) Belonging to a church building', 'B', 'Religion is the justice we owe to God.'),
    ('Justice - Gratitude', 'Gratitude is a matter of justice because:', 'A) It makes us feel good\nB) It is socially expected\nC) We owe acknowledgment for benefits received', 'C', 'Gratitude is a debt we owe for gifts received.'),
    ('Justice - Truthfulness', 'Truthfulness is a matter of justice because:', 'A) Others have a right to truth in communication\nB) Lying is illegal\nC) Truth is subjective', 'A', 'We owe others honest communication.'),
    ('Fortitude - Endurance', 'Endurance means:', 'A) Never feeling pain\nB) Steadfastly bearing difficulty for a good cause\nC) Physical toughness only', 'B', 'Endurance is spiritual strength through trials.'),
    ('Fortitude - Patience', 'Patience under Fortitude means:', 'A) Passive waiting\nB) Suppressing all emotions\nC) Bearing difficulties calmly, trusting God\'s timing', 'C', 'Patience is active trust in God\'s timing.'),
    ('Fortitude - Magnanimity', 'Magnanimity means:', 'A) Boasting about achievements\nB) Striving for great deeds in service to God\nC) Being satisfied with mediocrity', 'B', 'The magnanimous person aims high for God\'s glory.'),
    ('Temperance - Humility', 'Humility means:', 'A) Thinking you are worthless\nB) Never accepting praise\nC) Honest self-knowledge before God', 'C', 'Humility is truth about ourselves before God.'),
    ('Temperance - Meekness', 'Meekness means:', 'A) Being weak and passive\nB) Governing anger by reason - strength under control\nC) Never getting angry', 'B', 'Meekness is controlled strength, not weakness.'),
    ('Temperance - Chastity', 'Chastity means:', 'A) Rejecting the body as evil\nB) Rightly ordering sexual desire according to one\'s state\nC) Never having any desires', 'B', 'Chastity integrates sexuality within the whole person.'),
]

# Sample moral choices for print cards
PRINT_MORAL_CHOICES = [
    ('Your ship has the advantage over a retreating enemy.', 'Pursue aggressively to ensure the kill', 'Engage firmly but with restraint', 'Justice - Clemency'),
    ('An allied ship is damaged in your sector.', 'Focus on the enemy - others can help later', 'Cover the ally\'s retreat first', 'Justice - Friendship'),
    ('You spot a weakness in the enemy formation.', 'Attack immediately', 'Assess the situation carefully, then strike', 'Prudence - Circumspection'),
    ('Your ship is outnumbered.', 'Fight recklessly, hoping for the best', 'Fight strategically, conserving strength', 'Prudence - Reason'),
    ('An enemy ship is crippled and helpless.', 'Destroy it immediately', 'Disable it fully but spare unnecessary destruction', 'Temperance - Clemency'),
    ('You\'ve been fighting for hours. Fatigue sets in.', 'Push through regardless', 'Acknowledge your limits and fight smart', 'Temperance - Humility'),
    ('A fellow captain made a mistake that put you in danger.', 'Angrily criticize them over comms', 'Stay focused, address it calmly afterward', 'Temperance - Meekness'),
    ('The enemy advances on a colony base. Fear rises.', 'Hang back at a safe distance', 'Move to intercept, trusting in God\'s providence', 'Fortitude - Daring'),
    ('You\'ve been on patrol for days with no contact.', 'Let your guard down', 'Maintain vigilance and readiness', 'Fortitude - Perseverance'),
    ('Your mission seems impossible - 12 ships against a fleet.', 'Give in to despair about the odds', 'Embrace the challenge for God\'s glory', 'Fortitude - Magnanimity'),
    ('Resources are scarce and must be shared among ships.', 'Take more than your share', 'Distribute fairly according to need', 'Justice - Distributive Justice'),
    ('You\'ve won a decisive victory. How do you respond?', 'Celebrate your own skill', 'Give thanks to God and honor every crew member', 'Temperance - Modesty'),
]


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
            x = MARGIN + 1.25 * inch + col * SECTOR_SPACING
            y = PAGE_HEIGHT - MARGIN - 2.0 * inch - 1.25 * inch - row * SECTOR_SPACING
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

def draw_card(c, x, y, title, text, accent_color=None):
    """Draw a generic card (used for saint ships, enemy ships, action cards)."""
    color = accent_color or royal_turquoise
    c.setStrokeColor(color)
    c.setLineWidth(2)
    c.rect(x, y, CARD_WIDTH, CARD_HEIGHT)
    c.setFont(FONT_NAME, 14)
    c.setFillColor(color)
    title_width = c.stringWidth(title, FONT_NAME, 14)
    c.drawString(x + (CARD_WIDTH - title_width) / 2, y + CARD_HEIGHT - 25, title)
    c.setFont(FONT_NAME, 12)
    c.setFillColorRGB(0, 0, 0)
    wrapped_text = wrap_text(text, CARD_WIDTH - 20, FONT_NAME, 12, c)
    for i, line in enumerate(wrapped_text[:4]):
        line_width = c.stringWidth(line, FONT_NAME, 12)
        c.drawString(x + (CARD_WIDTH - line_width) / 2, y + CARD_HEIGHT - 50 - i * 15, line)

def draw_virtue_question_card(c, x, y, header, question, answers, correct, explanation):
    """Draw a virtue question card with question, answers, and explanation."""
    c.setStrokeColor(royal_turquoise)
    c.setLineWidth(2)
    c.rect(x, y, CARD_WIDTH, CARD_HEIGHT)

    # Header
    c.setFont(FONT_NAME, 10)
    c.setFillColor(royal_turquoise)
    c.drawCentredString(x + CARD_WIDTH / 2, y + CARD_HEIGHT - 18, header)

    # Question
    c.setFont(FONT_NAME, 9)
    c.setFillColorRGB(0, 0, 0)
    q_lines = wrap_text(question, CARD_WIDTH - 16, FONT_NAME, 9, c)
    y_pos = y + CARD_HEIGHT - 35
    for line in q_lines[:3]:
        c.drawString(x + 8, y_pos, line)
        y_pos -= 12

    # Answers
    y_pos -= 4
    c.setFont(FONT_NAME, 8)
    for ans_line in answers.split('\n'):
        a_lines = wrap_text(ans_line, CARD_WIDTH - 16, FONT_NAME, 8, c)
        for line in a_lines[:2]:
            c.drawString(x + 8, y_pos, line)
            y_pos -= 10

    # Answer indicator (small, upside down at bottom)
    c.setFont(FONT_NAME, 7)
    c.setFillColor(royal_turquoise)
    c.drawString(x + 8, y + 8, f"Answer: {correct}")

    # Explanation (small text)
    y_pos -= 4
    c.setFont(FONT_NAME, 7)
    c.setFillColorRGB(0.3, 0.3, 0.3)
    exp_lines = wrap_text(explanation, CARD_WIDTH - 16, FONT_NAME, 7, c)
    for line in exp_lines[:3]:
        c.drawString(x + 8, y_pos, line)
        y_pos -= 9

def draw_moral_choice_card(c, x, y, scenario, lesser, greater, virtue):
    """Draw a moral choice card."""
    c.setStrokeColor(Color(0.4, 0.2, 0.6))  # Purple accent for moral choices
    c.setLineWidth(2)
    c.rect(x, y, CARD_WIDTH, CARD_HEIGHT)

    # Header
    c.setFont(FONT_NAME, 10)
    c.setFillColor(Color(0.4, 0.2, 0.6))
    c.drawCentredString(x + CARD_WIDTH / 2, y + CARD_HEIGHT - 18, "Moral Choice")

    # Virtue tag
    c.setFont(FONT_NAME, 8)
    c.drawCentredString(x + CARD_WIDTH / 2, y + CARD_HEIGHT - 30, virtue)

    # Scenario
    c.setFont(FONT_NAME, 9)
    c.setFillColorRGB(0, 0, 0)
    s_lines = wrap_text(scenario, CARD_WIDTH - 16, FONT_NAME, 9, c)
    y_pos = y + CARD_HEIGHT - 48
    for line in s_lines[:3]:
        c.drawString(x + 8, y_pos, line)
        y_pos -= 12

    # Lesser good
    y_pos -= 6
    c.setFont(FONT_NAME, 8)
    c.setFillColor(Color(0.6, 0.3, 0))
    c.drawString(x + 8, y_pos, "Lesser Good:")
    y_pos -= 10
    c.setFillColorRGB(0, 0, 0)
    l_lines = wrap_text(lesser, CARD_WIDTH - 16, FONT_NAME, 8, c)
    for line in l_lines[:2]:
        c.drawString(x + 8, y_pos, line)
        y_pos -= 10

    # Greater good
    y_pos -= 6
    c.setFont(FONT_NAME, 8)
    c.setFillColor(royal_turquoise)
    c.drawString(x + 8, y_pos, "Greater Good (+1 dmg, +virtue):")
    y_pos -= 10
    c.setFillColorRGB(0, 0, 0)
    g_lines = wrap_text(greater, CARD_WIDTH - 16, FONT_NAME, 8, c)
    for line in g_lines[:2]:
        c.drawString(x + 8, y_pos, line)
        y_pos -= 10

def draw_token(c, x, y, token_type):
    """Draw a token (health, charge, virtue)."""
    c.setStrokeColor(royal_turquoise)
    c.setLineWidth(1)
    c.circle(x + TOKEN_SIZE / 2, y + TOKEN_SIZE / 2, TOKEN_SIZE / 2)
    c.setFont(FONT_NAME, 10)
    c.setFillColor(royal_turquoise)
    c.drawCentredString(x + TOKEN_SIZE / 2, y + TOKEN_SIZE / 2 - 5, token_type)

def draw_reference_page(c, title, items, columns=2):
    """Draw a reference page with items in columns."""
    c.setFont(FONT_NAME, 16)
    c.setFillColor(royal_turquoise)
    c.drawCentredString(PAGE_WIDTH / 2, PAGE_HEIGHT - MARGIN, title)

    usable_width = PAGE_WIDTH - 2 * MARGIN
    col_width = usable_width / columns
    y_start = PAGE_HEIGHT - MARGIN - 30
    y_pos = y_start
    col = 0

    for item in items:
        x = MARGIN + col * col_width

        if isinstance(item, tuple) and len(item) == 3:
            name, subtitle, desc = item
            c.setFont(FONT_NAME, 11)
            c.setFillColor(royal_turquoise)
            c.drawString(x, y_pos, name)
            c.setFont(FONT_NAME, 8)
            c.setFillColor(Color(0.4, 0.4, 0.4))
            c.drawString(x, y_pos - 12, subtitle)
            c.setFont(FONT_NAME, 9)
            c.setFillColorRGB(0, 0, 0)
            d_lines = wrap_text(desc, col_width - 10, FONT_NAME, 9, c)
            for i, line in enumerate(d_lines[:2]):
                c.drawString(x, y_pos - 24 - i * 11, line)
            y_pos -= 52
        elif isinstance(item, tuple) and len(item) == 2:
            name, desc = item
            c.setFont(FONT_NAME, 11)
            c.setFillColor(royal_turquoise)
            c.drawString(x, y_pos, name)
            c.setFont(FONT_NAME, 9)
            c.setFillColorRGB(0, 0, 0)
            d_lines = wrap_text(desc, col_width - 10, FONT_NAME, 9, c)
            for i, line in enumerate(d_lines[:2]):
                c.drawString(x, y_pos - 14 - i * 11, line)
            y_pos -= 40

        if y_pos < MARGIN + 0.5 * inch:
            col += 1
            y_pos = y_start
            if col >= columns:
                break


def create_pdf():
    """Generate the Stellar Virtue board game PDF."""
    c = canvas.Canvas("stellar_virtue.pdf", pagesize=letter)

    # Set PDF metadata
    c.setTitle("Stellar Virtue: A Cooperative Board Game")
    c.setAuthor("Zoseco")
    c.setSubject("Version 0.13")
    c.setCreator("Zoseco Team")
    c.setKeywords("Stellar Virtue, board game, cooperative, Catholic, AI, spaceship, virtues")

    # ===== Cover Page =====
    c.setFont(FONT_NAME, 24)
    c.setFillColor(royal_turquoise)
    c.drawCentredString(PAGE_WIDTH / 2, PAGE_HEIGHT / 2 + 50, "Stellar Virtue")
    c.setFont(FONT_NAME, 14)
    c.drawCentredString(PAGE_WIDTH / 2, PAGE_HEIGHT / 2 + 20, "A Cooperative Board Game by Zoseco")
    c.setFont(FONT_NAME, 10)
    c.drawCentredString(PAGE_WIDTH / 2, PAGE_HEIGHT / 2, "Version 0.13")
    c.setFont(FONT_NAME, 9)
    c.setFillColorRGB(0.3, 0.3, 0.3)
    c.drawCentredString(PAGE_WIDTH / 2, PAGE_HEIGHT / 2 - 30, "Learn the cardinal virtues, gifts and fruits of the Holy Spirit")
    c.drawCentredString(PAGE_WIDTH / 2, PAGE_HEIGHT / 2 - 45, "through cooperative gameplay and moral choices.")
    draw_common_footer(c)
    c.showPage()

    # ===== Instructions Page =====
    c.setFont(FONT_NAME, 16)
    c.setFillColor(royal_turquoise)
    c.drawCentredString(PAGE_WIDTH / 2, PAGE_HEIGHT - MARGIN, "Stellar Virtue: How to Play")
    instructions = [
        "Stellar Virtue is a cooperative board game where players command virtuous AI fleets to defend human colonies from rogue AI ships. The game spans 9 days, each with 7 turns themed after the Liturgy of the Hours: Lauds, Prime, Terce, Sext, None, Vespers, and Compline.",
        "Setup: Assemble the game board from three pages (12 sectors with Earth at center). Assign player bases (sectors 1, 5, 9) and place enemy spawns (sectors 4, 8, 12). Set up 12 player ships and 6 starting enemy ships.",
        "Gameplay: Each day, players take 7 turns. During prayer turns (Lauds, None), draw a Virtue Question card and answer to grow in virtue. During combat turns (Terce, Vespers), draw a Moral Choice card before attacking. Correct answers and greater-good choices earn virtue progress and combat bonuses.",
        "Virtues: Master all sub-virtues of a cardinal virtue to unlock its combat bonus. Theological virtues are received through Sunday rest. Gifts and Fruits of the Holy Spirit unlock as you progress.",
        "Winning: Survive 9 days without losing all bases. Bonus victory for defeating all 24 enemy ships.",
    ]
    y_pos = PAGE_HEIGHT - MARGIN - 30
    for line in instructions:
        wrapped_lines = wrap_text(line, PAGE_WIDTH - 2 * MARGIN, FONT_NAME, 11, c)
        for wrapped_line in wrapped_lines:
            c.setFont(FONT_NAME, 11)
            c.setFillColorRGB(0, 0, 0)
            c.drawString(MARGIN, y_pos, wrapped_line)
            y_pos -= 14
        y_pos -= 6
    draw_common_footer(c)
    c.showPage()

    # ===== Turn Actions and Daily Office Page =====
    c.setFont(FONT_NAME, 16)
    c.setFillColor(royal_turquoise)
    c.drawCentredString(PAGE_WIDTH / 2, PAGE_HEIGHT - MARGIN, "Turn Actions and Daily Office")
    turn_actions = [
        "Each day consists of 7 turns, themed after the Liturgy of the Hours:",
        "- Lauds: Morning prayer. Draw a Virtue Question card. Correct answer: +1 virtue progress, +1 grace. Wrong: +1 VP (consolation).",
        "- Prime: Draw a Catholic Action Card (Rosary, Charity, Confession, Fast, Almsgiving, Lectio Divina).",
        "- Terce: Mid-morning action. Move to an adjacent sector OR attack enemies. Before attacking, draw a Moral Choice card.",
        "- Sext: Noon. Charge weapons (+1 charge, max 3) OR repair (+1 health).",
        "- None: Afternoon. Draw a Virtue Question card OR spend 2 VP to heal +2 health.",
        "- Vespers: Evening action. Move OR attack (with Moral Choice card).",
        "- Compline: Night rest. Auto-heal +1 health.",
        "",
        "Every 7th day is Sunday (Lord's Day): All ships heal +2, a theological virtue grows, and a Sunday Reflection is read. No combat on Sundays.",
        "",
        "Cardinal Virtue Bonuses (when all sub-virtues mastered):",
        "- Prudence: Preview enemy actions (FORESIGHT)",
        "- Justice: +1 attack damage",
        "- Fortitude: Reduce incoming damage by 1",
        "- Temperance: Keep 1 charge after attacking",
    ]
    y_pos = PAGE_HEIGHT - MARGIN - 30
    for line in turn_actions:
        wrapped_lines = wrap_text(line, PAGE_WIDTH - 2 * MARGIN, FONT_NAME, 11, c)
        for wrapped_line in wrapped_lines:
            c.setFont(FONT_NAME, 11)
            c.setFillColorRGB(0, 0, 0)
            c.drawString(MARGIN, y_pos, wrapped_line)
            y_pos -= 13
    draw_common_footer(c)
    c.showPage()

    # ===== Virtue Taxonomy Reference Page =====
    c.setFont(FONT_NAME, 16)
    c.setFillColor(royal_turquoise)
    c.drawCentredString(PAGE_WIDTH / 2, PAGE_HEIGHT - MARGIN, "Cardinal Virtues & Sub-Virtues")
    c.setFont(FONT_NAME, 9)
    c.setFillColorRGB(0.3, 0.3, 0.3)
    c.drawCentredString(PAGE_WIDTH / 2, PAGE_HEIGHT - MARGIN - 15, "Master all sub-virtues (2 correct answers each) to unlock the cardinal virtue bonus")

    y_pos = PAGE_HEIGHT - MARGIN - 40
    for virtue, subs in CARDINAL_VIRTUES.items():
        c.setFont(FONT_NAME, 13)
        c.setFillColor(royal_turquoise)
        c.drawString(MARGIN, y_pos, virtue)
        y_pos -= 16
        # Draw sub-virtues in a wrapped row
        c.setFont(FONT_NAME, 10)
        c.setFillColorRGB(0, 0, 0)
        row_text = "  |  ".join(subs)
        row_lines = wrap_text(row_text, PAGE_WIDTH - 2 * MARGIN, FONT_NAME, 10, c)
        for line in row_lines:
            c.drawString(MARGIN + 10, y_pos, line)
            y_pos -= 13
        # Draw checkboxes for progress tracking
        c.setFont(FONT_NAME, 8)
        c.setFillColorRGB(0.5, 0.5, 0.5)
        for sub in subs:
            if y_pos < MARGIN + inch:
                break
            c.drawString(MARGIN + 15, y_pos, f"[ ][ ] {sub}")
            y_pos -= 11
        y_pos -= 10

    draw_common_footer(c)
    c.showPage()

    # ===== Gifts & Fruits Reference Page =====
    c.setFont(FONT_NAME, 16)
    c.setFillColor(royal_turquoise)
    c.drawCentredString(PAGE_WIDTH / 2, PAGE_HEIGHT - MARGIN, "Gifts & Fruits of the Holy Spirit")

    # Gifts
    y_pos = PAGE_HEIGHT - MARGIN - 30
    c.setFont(FONT_NAME, 13)
    c.setFillColor(royal_turquoise)
    c.drawString(MARGIN, y_pos, "7 Gifts of the Holy Spirit")
    y_pos -= 18
    for name, perfects, desc in GIFTS_OF_SPIRIT:
        c.setFont(FONT_NAME, 10)
        c.setFillColor(royal_turquoise)
        c.drawString(MARGIN + 10, y_pos, name)
        c.setFont(FONT_NAME, 8)
        c.setFillColor(Color(0.4, 0.4, 0.4))
        c.drawString(MARGIN + 120, y_pos, perfects)
        c.setFont(FONT_NAME, 9)
        c.setFillColorRGB(0, 0, 0)
        c.drawString(MARGIN + 10, y_pos - 12, desc)
        y_pos -= 28

    # Fruits
    y_pos -= 10
    c.setFont(FONT_NAME, 13)
    c.setFillColor(royal_turquoise)
    c.drawString(MARGIN, y_pos, "12 Fruits of the Holy Spirit")
    y_pos -= 18

    # Two columns for fruits
    col_width = (PAGE_WIDTH - 2 * MARGIN) / 2
    left_fruits = FRUITS_OF_SPIRIT[:6]
    right_fruits = FRUITS_OF_SPIRIT[6:]

    saved_y = y_pos
    for name, desc in left_fruits:
        c.setFont(FONT_NAME, 10)
        c.setFillColor(royal_turquoise)
        c.drawString(MARGIN + 10, y_pos, name)
        c.setFont(FONT_NAME, 8)
        c.setFillColorRGB(0, 0, 0)
        c.drawString(MARGIN + 10, y_pos - 11, desc)
        y_pos -= 26

    y_pos = saved_y
    for name, desc in right_fruits:
        c.setFont(FONT_NAME, 10)
        c.setFillColor(royal_turquoise)
        c.drawString(MARGIN + col_width + 10, y_pos, name)
        c.setFont(FONT_NAME, 8)
        c.setFillColorRGB(0, 0, 0)
        c.drawString(MARGIN + col_width + 10, y_pos - 11, desc)
        y_pos -= 26

    draw_common_footer(c)
    c.showPage()

    # ===== Game Board (3 pages) =====
    draw_game_board(c)

    # ===== Saint Ships (2 pages, 6 per page) =====
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

    # ===== Enemy Ships (4 pages, 6 per page) =====
    for page in range(4):
        for i in range(6):
            index = page * 6 + i
            if index >= 24:
                break
            col = i % 3
            row = i // 3
            x = MARGIN + col * (CARD_WIDTH + CARD_SPACING)
            y = PAGE_HEIGHT - MARGIN - (row + 1) * (CARD_HEIGHT + CARD_SPACING)
            draw_card(c, x, y, f"Enemy Ship {index + 1}", "Health: [ ] [ ]", accent_color=dark_red)
        draw_common_footer(c)
        c.showPage()

    # ===== Catholic Action Cards (4 pages, 6 per page) =====
    catholic_actions = [
        "Pray the Rosary: Gain 2 virtue points.",
        "Act of Charity: Heal all ships in one sector by 1 health.",
        "Confession: Remove one enemy ship from the board.",
        "Fast: Skip a turn to gain 3 virtue points.",
        "Almsgiving: Heal all player ships by 1 health.",
        "Lectio Divina: Gain 1 virtue point and draw a card."
    ] * 4
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

    # ===== Enemy Action Cards (4 pages, 6 per page) =====
    enemy_actions = [
        "Advance: Move all enemy ships one sector toward the nearest base.",
        "Assault: All enemy ships attack; spawn 1 new ship.",
        "Flank: Move half the enemy ships two sectors toward a base.",
        "Regroup: Move all enemy ships one sector away from bases.",
        "Ambush: Enemy ships in player sectors deal double damage.",
        "Reinforce: Spawn 2 new enemy ships in a spawn sector."
    ] * 4
    for page in range(4):
        for i in range(6):
            index = page * 6 + i
            if index >= 24:
                break
            col = i % 3
            row = i // 3
            x = MARGIN + col * (CARD_WIDTH + CARD_SPACING)
            y = PAGE_HEIGHT - MARGIN - (row + 1) * (CARD_HEIGHT + CARD_SPACING)
            draw_card(c, x, y, "Enemy Action", enemy_actions[index % len(enemy_actions)], accent_color=dark_red)
        draw_common_footer(c)
        c.showPage()

    # ===== Virtue Question Cards (2 pages, 6 per page) =====
    for page in range(2):
        for i in range(6):
            index = page * 6 + i
            if index >= len(PRINT_VIRTUE_QUESTIONS):
                break
            col = i % 3
            row = i // 3
            x = MARGIN + col * (CARD_WIDTH + CARD_SPACING)
            y = PAGE_HEIGHT - MARGIN - (row + 1) * (CARD_HEIGHT + CARD_SPACING)
            header, question, answers, correct, explanation = PRINT_VIRTUE_QUESTIONS[index]
            draw_virtue_question_card(c, x, y, header, question, answers, correct, explanation)
        draw_common_footer(c)
        c.showPage()

    # ===== Moral Choice Cards (2 pages, 6 per page) =====
    for page in range(2):
        for i in range(6):
            index = page * 6 + i
            if index >= len(PRINT_MORAL_CHOICES):
                break
            col = i % 3
            row = i // 3
            x = MARGIN + col * (CARD_WIDTH + CARD_SPACING)
            y = PAGE_HEIGHT - MARGIN - (row + 1) * (CARD_HEIGHT + CARD_SPACING)
            scenario, lesser, greater, virtue = PRINT_MORAL_CHOICES[index]
            draw_moral_choice_card(c, x, y, scenario, lesser, greater, virtue)
        draw_common_footer(c)
        c.showPage()

    # ===== Tokens (1 page) =====
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
