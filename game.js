// Stellar Virtue - Game Engine
// A cooperative board game about virtuous AI spaceships

(function () {
  'use strict';

  // ===== Game Data =====
  const SAINT_NAMES = [
    'St. Peter', 'St. Paul', 'St. Augustine', 'St. Thomas Aquinas',
    'St. Francis', 'St. Teresa of Avila', 'St. Ignatius', 'St. Catherine',
    'St. Joan of Arc', 'St. Therese', 'St. John Paul II', 'St. Mother Teresa'
  ];

  const TURNS = ['Lauds', 'Prime', 'Terce', 'Sext', 'None', 'Vespers', 'Compline'];

  const CATHOLIC_ACTIONS = [
    { name: 'Pray the Rosary', text: 'Gain 2 virtue points.', effect: 'virtue2' },
    { name: 'Act of Charity', text: 'Heal all ships in one sector by 1 health.', effect: 'healSector' },
    { name: 'Confession', text: 'Remove one enemy ship from the board.', effect: 'removeEnemy' },
    { name: 'Fast', text: 'Skip a turn to gain 3 virtue points.', effect: 'virtue3' },
    { name: 'Almsgiving', text: 'Heal all player ships by 1 health.', effect: 'healAll' },
    { name: 'Lectio Divina', text: 'Gain 1 virtue point and draw another card.', effect: 'virtue1draw' }
  ];

  // ===== Virtue System =====
  const VIRTUES = {
    faith: {
      name: 'Faith',
      subVirtues: ['trust', 'devotion', 'witness'],
      subNames: { trust: 'Trust', devotion: 'Devotion', witness: 'Witness' },
      bonus: '+1 max charge (4 instead of 3)',
      bonusShort: 'MAX CHG 4'
    },
    hope: {
      name: 'Hope',
      subVirtues: ['perseverance', 'optimism', 'courage'],
      subNames: { perseverance: 'Perseverance', optimism: 'Optimism', courage: 'Courage' },
      bonus: '+1 max health (4 instead of 3)',
      bonusShort: 'MAX HP 4'
    },
    charity: {
      name: 'Charity',
      subVirtues: ['generosity', 'compassion', 'sacrifice'],
      subNames: { generosity: 'Generosity', compassion: 'Compassion', sacrifice: 'Sacrifice' },
      bonus: 'Praying heals adjacent allied ships',
      bonusShort: 'PRAY HEALS'
    },
    prudence: {
      name: 'Prudence',
      subVirtues: ['discernment', 'foresight', 'caution'],
      subNames: { discernment: 'Discernment', foresight: 'Foresight', caution: 'Caution' },
      bonus: 'Preview enemy action before it happens',
      bonusShort: 'FORESIGHT'
    },
    justice: {
      name: 'Justice',
      subVirtues: ['fairness', 'integrity', 'duty'],
      subNames: { fairness: 'Fairness', integrity: 'Integrity', duty: 'Duty' },
      bonus: '+1 attack damage',
      bonusShort: 'ATK +1'
    },
    fortitude: {
      name: 'Fortitude',
      subVirtues: ['endurance', 'patience', 'bravery'],
      subNames: { endurance: 'Endurance', patience: 'Patience', bravery: 'Bravery' },
      bonus: 'Reduce incoming damage by 1',
      bonusShort: 'DEF +1'
    },
    temperance: {
      name: 'Temperance',
      subVirtues: ['moderation', 'humility', 'selfControl'],
      subNames: { moderation: 'Moderation', humility: 'Humility', selfControl: 'Self-Control' },
      bonus: 'Attacks keep 1 charge instead of resetting to 0',
      bonusShort: 'KEEP CHG'
    }
  };

  const VIRTUE_QUESTIONS = [
    // ===== FAITH - Trust =====
    { virtue: 'faith', sub: 'trust', q: 'What does it mean to trust in God?',
      answers: ['Believe He will guide you even when you cannot see the way', 'Only trust when things go well', 'Trust yourself above all'],
      correct: 0, explanation: 'Trust in God means relying on His plan even in uncertainty.' },
    { virtue: 'faith', sub: 'trust', q: 'Abraham was asked to sacrifice Isaac. What virtue did he show?',
      answers: ['Trust in God\'s plan', 'Blind obedience without faith', 'Despair'],
      correct: 0, explanation: 'Abraham trusted God completely, even when asked to do the unthinkable.' },
    { virtue: 'faith', sub: 'trust', q: 'When facing a difficult situation, trust calls us to:',
      answers: ['Place our confidence in God\'s providence', 'Panic and give up', 'Rely only on our own strength'],
      correct: 0, explanation: 'Trust means placing confidence in God\'s care for us.' },
    { virtue: 'faith', sub: 'trust', q: 'Which Psalm says "Trust in the Lord with all your heart"?',
      answers: ['Proverbs 3:5', 'Psalm 23', 'Genesis 1:1'],
      correct: 0, explanation: 'Proverbs 3:5 teaches us to trust God completely, not our own understanding.' },
    { virtue: 'faith', sub: 'trust', q: 'A friend betrays your confidence. Trust in God helps you to:',
      answers: ['Forgive and continue to love, knowing God is faithful', 'Never trust anyone again', 'Seek revenge'],
      correct: 0, explanation: 'God\'s faithfulness teaches us to forgive and love even when others fail us.' },

    // ===== FAITH - Devotion =====
    { virtue: 'faith', sub: 'devotion', q: 'What is devotion in the Catholic faith?',
      answers: ['Deep love and commitment to God through prayer and worship', 'Going to church only on holidays', 'Doing good deeds to impress others'],
      correct: 0, explanation: 'Devotion is a heartfelt commitment to loving and serving God.' },
    { virtue: 'faith', sub: 'devotion', q: 'The Rosary is a devotion that honors:',
      answers: ['The Blessed Virgin Mary and the life of Christ', 'Only the saints', 'Ancient traditions with no meaning'],
      correct: 0, explanation: 'The Rosary meditates on the mysteries of Christ\'s life through Mary\'s intercession.' },
    { virtue: 'faith', sub: 'devotion', q: 'Daily prayer is an act of devotion because it:',
      answers: ['Keeps our hearts turned toward God throughout the day', 'Is required to avoid punishment', 'Has no real purpose'],
      correct: 0, explanation: 'Prayer nurtures our relationship with God and keeps us close to Him.' },
    { virtue: 'faith', sub: 'devotion', q: 'Which saint is known for extraordinary devotion to the Eucharist?',
      answers: ['St. Thomas Aquinas', 'St. Patrick', 'St. Nicholas'],
      correct: 0, explanation: 'St. Thomas Aquinas wrote beautiful hymns about the Eucharist and devoted his life to understanding God.' },
    { virtue: 'faith', sub: 'devotion', q: 'Devotion to God means we should pray:',
      answers: ['In good times and bad, consistently', 'Only when we need something', 'Only when we feel like it'],
      correct: 0, explanation: 'True devotion persists through all seasons of life.' },

    // ===== FAITH - Witness =====
    { virtue: 'faith', sub: 'witness', q: 'What does it mean to be a witness to your faith?',
      answers: ['Living your beliefs so others can see God\'s love through you', 'Forcing others to convert', 'Keeping your faith completely private'],
      correct: 0, explanation: 'Witness means showing God\'s love through your words and actions.' },
    { virtue: 'faith', sub: 'witness', q: 'The early Christian martyrs witnessed their faith by:',
      answers: ['Giving their lives rather than deny Christ', 'Fighting wars of conquest', 'Hiding from persecution'],
      correct: 0, explanation: 'Martyrs gave the ultimate witness by dying for their faith in Christ.' },
    { virtue: 'faith', sub: 'witness', q: 'How can you witness your faith at school or work?',
      answers: ['By being kind, honest, and treating everyone with dignity', 'By judging others who don\'t believe', 'By never mentioning your beliefs'],
      correct: 0, explanation: 'Living with virtue and love is the most powerful witness.' },
    { virtue: 'faith', sub: 'witness', q: 'Jesus told the apostles to be His witnesses to:',
      answers: ['The ends of the earth', 'Only in Jerusalem', 'Only to people they already knew'],
      correct: 0, explanation: 'In Acts 1:8, Jesus calls us to witness everywhere, to all people.' },
    { virtue: 'faith', sub: 'witness', q: 'St. Paul witnessed to his faith by:',
      answers: ['Traveling and preaching despite suffering and imprisonment', 'Staying home and writing letters only', 'Giving up when things got hard'],
      correct: 0, explanation: 'St. Paul endured incredible hardship to spread the Gospel.' },

    // ===== HOPE - Perseverance =====
    { virtue: 'hope', sub: 'perseverance', q: 'What is perseverance?',
      answers: ['Continuing to do good even when it\'s difficult', 'Giving up when things get hard', 'Doing only easy tasks'],
      correct: 0, explanation: 'Perseverance means staying faithful and persistent through challenges.' },
    { virtue: 'hope', sub: 'perseverance', q: 'Job persevered through suffering because he:',
      answers: ['Kept faith in God despite losing everything', 'Blamed God for his problems', 'Gave up on life'],
      correct: 0, explanation: 'Job\'s perseverance through suffering is a model of unwavering hope.' },
    { virtue: 'hope', sub: 'perseverance', q: 'When a task seems impossible, perseverance calls us to:',
      answers: ['Keep trying with God\'s help', 'Quit immediately', 'Wait for someone else to do it'],
      correct: 0, explanation: 'With God, all things are possible — perseverance means trusting that.' },
    { virtue: 'hope', sub: 'perseverance', q: '"Let us not grow weary of doing good" comes from:',
      answers: ['Galatians 6:9', 'Matthew 1:1', 'Revelation 22:21'],
      correct: 0, explanation: 'St. Paul encourages us to persist in doing good, for we will reap a harvest.' },
    { virtue: 'hope', sub: 'perseverance', q: 'A student struggles with a subject. Perseverance means:',
      answers: ['Continuing to study and asking for help', 'Cheating on the exam', 'Dropping the course'],
      correct: 0, explanation: 'Perseverance includes seeking help and not giving up.' },

    // ===== HOPE - Optimism =====
    { virtue: 'hope', sub: 'optimism', q: 'Christian optimism is based on:',
      answers: ['The certainty that God loves us and has a plan for our good', 'Ignoring all problems', 'Pretending everything is perfect'],
      correct: 0, explanation: 'Christian optimism isn\'t naive — it\'s rooted in God\'s promises.' },
    { virtue: 'hope', sub: 'optimism', q: 'Romans 8:28 teaches that:',
      answers: ['All things work together for good for those who love God', 'Bad things never happen to good people', 'We should ignore suffering'],
      correct: 0, explanation: 'God can bring good even from our struggles and sufferings.' },
    { virtue: 'hope', sub: 'optimism', q: 'When facing bad news, a Christian optimist:',
      answers: ['Acknowledges the difficulty but trusts in God\'s bigger plan', 'Pretends nothing is wrong', 'Gives in to despair'],
      correct: 0, explanation: 'True optimism faces reality while trusting in God\'s providence.' },
    { virtue: 'hope', sub: 'optimism', q: 'The Resurrection gives Christians reason for optimism because:',
      answers: ['It shows that God conquers even death itself', 'It was just a historical event', 'It only matters for the afterlife'],
      correct: 0, explanation: 'The Resurrection is the ultimate sign that hope triumphs over despair.' },
    { virtue: 'hope', sub: 'optimism', q: 'St. Therese of Lisieux practiced optimism through:',
      answers: ['Finding joy in small, everyday acts of love', 'Grand public gestures', 'Avoiding all difficulty'],
      correct: 0, explanation: 'Her "Little Way" found God\'s love and hope in the smallest moments.' },

    // ===== HOPE - Courage =====
    { virtue: 'hope', sub: 'courage', q: 'How does hope give us courage?',
      answers: ['Knowing God is with us empowers us to face fears', 'It eliminates all fear', 'Courage means never being afraid'],
      correct: 0, explanation: 'Courage isn\'t the absence of fear — it\'s acting despite fear, trusting in God.' },
    { virtue: 'hope', sub: 'courage', q: 'David faced Goliath with courage because:',
      answers: ['He trusted that God would deliver him', 'He was physically stronger', 'He had better weapons'],
      correct: 0, explanation: 'David\'s courage came from his faith in God, not his own strength.' },
    { virtue: 'hope', sub: 'courage', q: 'A friend is being bullied. Courage calls you to:',
      answers: ['Stand up for them even if it\'s scary', 'Ignore the situation', 'Join the bullies to stay safe'],
      correct: 0, explanation: 'Courage means defending what is right, even at personal cost.' },
    { virtue: 'hope', sub: 'courage', q: '"Be not afraid" appears in the Bible approximately:',
      answers: ['365 times — one for each day', '10 times', 'Only once'],
      correct: 0, explanation: 'God repeatedly tells us not to fear — He is always with us.' },
    { virtue: 'hope', sub: 'courage', q: 'St. Joan of Arc showed courage by:',
      answers: ['Leading an army for France despite being a young peasant girl', 'Hiding from responsibility', 'Waiting for someone braver'],
      correct: 0, explanation: 'Joan trusted God\'s call and bravely answered, despite enormous odds.' },

    // ===== CHARITY - Generosity =====
    { virtue: 'charity', sub: 'generosity', q: 'What is generosity in the Christian sense?',
      answers: ['Giving freely of your time, talent, and treasure without expecting return', 'Giving only to get something back', 'Giving only your excess'],
      correct: 0, explanation: 'True generosity gives freely, as God gives to us.' },
    { virtue: 'charity', sub: 'generosity', q: 'The widow\'s mite teaches us that:',
      answers: ['Giving from our need is more generous than giving from excess', 'Only large donations matter', 'Poor people shouldn\'t give'],
      correct: 0, explanation: 'Jesus praised the widow who gave her last coins — generosity is about the heart.' },
    { virtue: 'charity', sub: 'generosity', q: 'How can you practice generosity daily?',
      answers: ['Share your time, help others, and give what you can', 'Only donate money to charities', 'Wait until you\'re wealthy to give'],
      correct: 0, explanation: 'Generosity can be practiced in countless small ways every day.' },
    { virtue: 'charity', sub: 'generosity', q: 'St. Francis of Assisi practiced generosity by:',
      answers: ['Giving up his wealth to serve the poor and live simply', 'Becoming wealthy to donate more', 'Only helping animals'],
      correct: 0, explanation: 'Francis gave away everything to follow Christ and serve the poorest.' },
    { virtue: 'charity', sub: 'generosity', q: '"God loves a cheerful giver" is from:',
      answers: ['2 Corinthians 9:7', 'Matthew 5:5', 'John 3:16'],
      correct: 0, explanation: 'St. Paul teaches that generosity should come from joy, not obligation.' },

    // ===== CHARITY - Compassion =====
    { virtue: 'charity', sub: 'compassion', q: 'What is compassion?',
      answers: ['Feeling the suffering of others and being moved to help', 'Feeling sorry for yourself', 'Ignoring others\' pain'],
      correct: 0, explanation: 'Compassion means "to suffer with" — sharing in others\' pain and acting to help.' },
    { virtue: 'charity', sub: 'compassion', q: 'The Good Samaritan showed compassion by:',
      answers: ['Stopping to help a stranger that others had ignored', 'Walking past like everyone else', 'Helping only because he was paid'],
      correct: 0, explanation: 'The Samaritan crossed social boundaries to help someone in need.' },
    { virtue: 'charity', sub: 'compassion', q: 'Jesus showed compassion when He:',
      answers: ['Wept at the tomb of Lazarus', 'Ignored the sick', 'Turned away from sinners'],
      correct: 0, explanation: 'Jesus\' tears show us that God deeply feels our pain and loss.' },
    { virtue: 'charity', sub: 'compassion', q: 'Mother Teresa practiced compassion by:',
      answers: ['Caring for the dying and poorest of the poor in Calcutta', 'Building wealthy institutions', 'Writing books about poverty'],
      correct: 0, explanation: 'Mother Teresa saw Christ in every suffering person and served them with love.' },
    { virtue: 'charity', sub: 'compassion', q: 'When a classmate is sad, compassion calls you to:',
      answers: ['Listen to them and offer comfort', 'Tell them to get over it', 'Avoid them because sadness is uncomfortable'],
      correct: 0, explanation: 'Being present and listening is one of the greatest acts of compassion.' },

    // ===== CHARITY - Sacrifice =====
    { virtue: 'charity', sub: 'sacrifice', q: 'What does sacrifice mean in Christian life?',
      answers: ['Giving up something good for something greater, out of love', 'Losing things against your will', 'Never enjoying anything'],
      correct: 0, explanation: 'Sacrifice is a free choice to give something up for love of God or neighbor.' },
    { virtue: 'charity', sub: 'sacrifice', q: 'Jesus\' greatest sacrifice was:',
      answers: ['Dying on the Cross for the salvation of humanity', 'Leaving Heaven', 'Fasting in the desert'],
      correct: 0, explanation: 'The Cross is the ultimate act of sacrificial love — giving His life for us.' },
    { virtue: 'charity', sub: 'sacrifice', q: 'A parent who works long hours to provide for their family shows:',
      answers: ['Sacrificial love', 'Selfishness', 'Poor time management'],
      correct: 0, explanation: 'Parents often sacrifice personal comfort and time out of love for their children.' },
    { virtue: 'charity', sub: 'sacrifice', q: 'Lenten sacrifices help us to:',
      answers: ['Grow closer to God by giving up comforts and focusing on prayer', 'Suffer for no reason', 'Show others how holy we are'],
      correct: 0, explanation: 'Lenten sacrifice unites our small sufferings with Christ\'s and deepens our faith.' },
    { virtue: 'charity', sub: 'sacrifice', q: 'St. Maximilian Kolbe sacrificed by:',
      answers: ['Offering his life in place of a stranger at Auschwitz', 'Running away from danger', 'Sacrificing only his comfort'],
      correct: 0, explanation: 'Fr. Kolbe volunteered to die so another prisoner could live — heroic sacrifice.' },

    // ===== PRUDENCE - Discernment =====
    { virtue: 'prudence', sub: 'discernment', q: 'What is discernment?',
      answers: ['The ability to judge well and distinguish right from wrong', 'Making quick decisions without thinking', 'Always choosing the easiest option'],
      correct: 0, explanation: 'Discernment is the wisdom to see clearly and choose rightly.' },
    { virtue: 'prudence', sub: 'discernment', q: 'King Solomon asked God for:',
      answers: ['Wisdom to discern good from evil and govern well', 'Wealth and power', 'A long life'],
      correct: 0, explanation: 'Solomon\'s request for wisdom pleased God — discernment is a precious gift.' },
    { virtue: 'prudence', sub: 'discernment', q: 'How do you practice discernment?',
      answers: ['Pray, seek wise counsel, and reflect before deciding', 'Go with your first impulse', 'Let others decide for you'],
      correct: 0, explanation: 'Good discernment combines prayer, advice, and careful reflection.' },
    { virtue: 'prudence', sub: 'discernment', q: 'St. Ignatius of Loyola taught discernment through:',
      answers: ['The Spiritual Exercises — examining inner movements of the soul', 'Strict rules only', 'Avoiding all decisions'],
      correct: 0, explanation: 'Ignatian discernment helps us recognize God\'s voice among many impulses.' },
    { virtue: 'prudence', sub: 'discernment', q: 'When friends pressure you to do something wrong, discernment helps you:',
      answers: ['Recognize the pressure and choose what is right', 'Go along to fit in', 'Avoid having friends'],
      correct: 0, explanation: 'Discernment gives clarity to resist peer pressure and choose good.' },

    // ===== PRUDENCE - Foresight =====
    { virtue: 'prudence', sub: 'foresight', q: 'What is foresight as a sub-virtue of prudence?',
      answers: ['Thinking ahead about consequences before acting', 'Predicting the future', 'Worrying about everything'],
      correct: 0, explanation: 'Foresight means wisely considering where our choices will lead.' },
    { virtue: 'prudence', sub: 'foresight', q: 'The parable of the wise and foolish builders teaches:',
      answers: ['Plan ahead and build your life on a strong foundation (Christ)', 'Building quickly is best', 'Location doesn\'t matter'],
      correct: 0, explanation: 'The wise builder thought ahead and built on rock — foresight in action.' },
    { virtue: 'prudence', sub: 'foresight', q: 'Joseph in Egypt showed foresight by:',
      answers: ['Storing grain during years of plenty to prepare for famine', 'Ignoring Pharaoh\'s dreams', 'Spending resources immediately'],
      correct: 0, explanation: 'Joseph\'s wise planning saved Egypt and his own family from starvation.' },
    { virtue: 'prudence', sub: 'foresight', q: 'Before starting a big project, foresight tells us to:',
      answers: ['Count the cost and plan carefully', 'Just start and figure it out later', 'Wait until the last minute'],
      correct: 0, explanation: 'Jesus Himself said to count the cost before building a tower (Luke 14:28).' },
    { virtue: 'prudence', sub: 'foresight', q: 'The parable of the ten virgins teaches foresight through:',
      answers: ['Being prepared — the wise virgins brought extra oil', 'Sleeping is always bad', 'The bridegroom was late'],
      correct: 0, explanation: 'The wise virgins\' preparation is a model of foresight and readiness.' },

    // ===== PRUDENCE - Caution =====
    { virtue: 'prudence', sub: 'caution', q: 'What is caution as a virtue?',
      answers: ['Being careful and thoughtful to avoid unnecessary harm', 'Being afraid of everything', 'Never taking any risks'],
      correct: 0, explanation: 'Virtuous caution is not cowardice — it\'s wisdom applied to avoiding harm.' },
    { virtue: 'prudence', sub: 'caution', q: 'Jesus told His disciples to be:',
      answers: ['Wise as serpents and innocent as doves', 'Fearful of everything', 'Reckless and bold'],
      correct: 0, explanation: 'Jesus calls us to combine caution (wisdom) with goodness (innocence).' },
    { virtue: 'prudence', sub: 'caution', q: 'When offered something that seems too good to be true, caution says:',
      answers: ['Investigate carefully before committing', 'Jump in immediately', 'Reject everything suspicious'],
      correct: 0, explanation: 'Caution helps us evaluate situations wisely before acting.' },
    { virtue: 'prudence', sub: 'caution', q: 'The book of Proverbs frequently advises caution against:',
      answers: ['Hasty decisions and the company of fools', 'All friendships', 'Any form of risk'],
      correct: 0, explanation: 'Proverbs teaches that the wise person is cautious and turns from evil.' },
    { virtue: 'prudence', sub: 'caution', q: 'Caution is different from cowardice because:',
      answers: ['Caution weighs risks wisely; cowardice avoids all action from fear', 'They are the same thing', 'Caution means never acting'],
      correct: 0, explanation: 'The cautious person still acts — but wisely and with care.' },

    // ===== JUSTICE - Fairness =====
    { virtue: 'justice', sub: 'fairness', q: 'What does fairness mean in Catholic teaching?',
      answers: ['Giving each person what they are rightfully due', 'Treating everyone exactly the same regardless of need', 'Making sure you get your fair share first'],
      correct: 0, explanation: 'Justice means giving others what they deserve — considering their dignity and needs.' },
    { virtue: 'justice', sub: 'fairness', q: 'Jesus showed fairness by:',
      answers: ['Welcoming all people — sinners, outcasts, rich and poor alike', 'Favoring the wealthy', 'Only helping His own people'],
      correct: 0, explanation: 'Jesus treated every person with equal dignity as a child of God.' },
    { virtue: 'justice', sub: 'fairness', q: 'When dividing tasks in a group, fairness means:',
      answers: ['Distributing work according to ability so no one is overburdened', 'Giving all hard work to one person', 'Doing nothing yourself'],
      correct: 0, explanation: 'Fair distribution considers each person\'s strengths and circumstances.' },
    { virtue: 'justice', sub: 'fairness', q: 'The Catholic principle of the "universal destination of goods" teaches:',
      answers: ['The earth\'s resources are meant for all people, not just the few', 'Private property is always wrong', 'Wealthy people earned everything they have'],
      correct: 0, explanation: 'God created the earth\'s goods for everyone — this calls us to share justly.' },
    { virtue: 'justice', sub: 'fairness', q: 'A fair judge must:',
      answers: ['Consider all evidence impartially and without prejudice', 'Always side with the majority', 'Punish as harshly as possible'],
      correct: 0, explanation: 'Justice requires impartiality and careful consideration of truth.' },

    // ===== JUSTICE - Integrity =====
    { virtue: 'justice', sub: 'integrity', q: 'What is integrity?',
      answers: ['Being honest and consistent in your values, even when no one is watching', 'Only being good when others can see', 'Following rules to avoid punishment'],
      correct: 0, explanation: 'Integrity means your actions match your beliefs, always.' },
    { virtue: 'justice', sub: 'integrity', q: 'St. Thomas More showed integrity by:',
      answers: ['Refusing to approve the King\'s divorce, even at the cost of his life', 'Going along with the King to keep his position', 'Running away from England'],
      correct: 0, explanation: 'More chose death over compromising his conscience — supreme integrity.' },
    { virtue: 'justice', sub: 'integrity', q: 'You find a wallet full of money. Integrity calls you to:',
      answers: ['Return it to its owner', 'Keep the money since no one saw you', 'Take some and return the rest'],
      correct: 0, explanation: 'Integrity means doing the right thing even when you could get away with wrong.' },
    { virtue: 'justice', sub: 'integrity', q: 'A person of integrity:',
      answers: ['Keeps their promises and tells the truth', 'Makes promises they don\'t intend to keep', 'Changes their values to fit each situation'],
      correct: 0, explanation: 'Integrity means being consistent and trustworthy in word and action.' },
    { virtue: 'justice', sub: 'integrity', q: 'The Eighth Commandment supports integrity by teaching:',
      answers: ['You shall not bear false witness — do not lie', 'You shall not steal', 'Remember the Sabbath'],
      correct: 0, explanation: 'The command against lying upholds the value of truth and integrity.' },

    // ===== JUSTICE - Duty =====
    { virtue: 'justice', sub: 'duty', q: 'What is duty in the Christian life?',
      answers: ['Fulfilling your responsibilities to God, family, and community', 'Doing only what you feel like', 'Following orders without thinking'],
      correct: 0, explanation: 'Duty means faithfully fulfilling the responsibilities God has given us.' },
    { virtue: 'justice', sub: 'duty', q: 'Mary said "yes" to God at the Annunciation. This shows:',
      answers: ['Faithful acceptance of her duty as Mother of God', 'She had no choice', 'It was an easy decision'],
      correct: 0, explanation: 'Mary freely accepted her sacred duty with faith and courage.' },
    { virtue: 'justice', sub: 'duty', q: 'A student\'s duty includes:',
      answers: ['Studying diligently and respecting teachers and classmates', 'Only doing the minimum to pass', 'Letting others do the work'],
      correct: 0, explanation: 'Each state of life has duties — students serve God by learning well.' },
    { virtue: 'justice', sub: 'duty', q: 'The parable of the talents teaches about duty because:',
      answers: ['God entrusts us with gifts and expects us to use them faithfully', 'We should hide our talents to keep them safe', 'Only talented people have duties'],
      correct: 0, explanation: 'We have a duty to develop and use the gifts God gives us.' },
    { virtue: 'justice', sub: 'duty', q: 'St. Joseph fulfilled his duty by:',
      answers: ['Protecting and providing for Mary and Jesus faithfully', 'Seeking fame and recognition', 'Abandoning his family when things got difficult'],
      correct: 0, explanation: 'Joseph is a model of quiet, faithful duty — he did what was right without seeking praise.' },

    // ===== FORTITUDE - Endurance =====
    { virtue: 'fortitude', sub: 'endurance', q: 'What is endurance?',
      answers: ['The strength to persist through long-term difficulty', 'Never feeling pain', 'Physical strength only'],
      correct: 0, explanation: 'Endurance is spiritual and moral strength to keep going through trials.' },
    { virtue: 'fortitude', sub: 'endurance', q: 'The early Christians endured persecution because:',
      answers: ['Their love for Christ was stronger than their fear of death', 'They enjoyed suffering', 'They had no other choice'],
      correct: 0, explanation: 'The martyrs\' endurance came from deep love for Christ and hope in eternal life.' },
    { virtue: 'fortitude', sub: 'endurance', q: 'St. Paul wrote about endurance saying:',
      answers: ['Suffering produces endurance, endurance produces character, character produces hope', 'Avoid all suffering', 'The strong don\'t need endurance'],
      correct: 0, explanation: 'Romans 5:3-4 shows how endurance builds character and strengthens hope.' },
    { virtue: 'fortitude', sub: 'endurance', q: 'When you feel like giving up on doing good:',
      answers: ['Remember that endurance in doing good will bear fruit', 'Stop trying — it\'s not worth it', 'Only do good when it\'s easy'],
      correct: 0, explanation: 'Galatians 6:9 promises a harvest for those who don\'t give up.' },
    { virtue: 'fortitude', sub: 'endurance', q: 'Endurance is like a muscle because:',
      answers: ['It grows stronger through practice and use', 'It can\'t be developed', 'Only some people are born with it'],
      correct: 0, explanation: 'Every challenge we endure strengthens us for the next one.' },

    // ===== FORTITUDE - Patience =====
    { virtue: 'fortitude', sub: 'patience', q: 'What is patience?',
      answers: ['Bearing difficulties calmly without complaint, trusting in God\'s timing', 'Waiting passively and doing nothing', 'Suppressing anger'],
      correct: 0, explanation: 'Patience is active trust in God\'s timing while persevering peacefully.' },
    { virtue: 'fortitude', sub: 'patience', q: 'Jesus showed patience when:',
      answers: ['He endured the mockery and suffering of the Passion without retaliation', 'He always got immediate results', 'He never had to wait for anything'],
      correct: 0, explanation: 'Christ\'s patience during His Passion is the ultimate model of this virtue.' },
    { virtue: 'fortitude', sub: 'patience', q: 'When stuck in a long line or traffic, patience calls us to:',
      answers: ['Accept the delay peacefully and use the time for prayer or reflection', 'Lose our temper', 'Cut ahead of others'],
      correct: 0, explanation: 'Small daily frustrations are opportunities to practice patience.' },
    { virtue: 'fortitude', sub: 'patience', q: 'The fruit of the Spirit includes patience because:',
      answers: ['The Holy Spirit helps us bear with others and trust God\'s plan', 'Being patient is just a natural personality trait', 'Only patient people receive the Spirit'],
      correct: 0, explanation: 'Patience is a gift of the Spirit that grows as we cooperate with grace.' },
    { virtue: 'fortitude', sub: 'patience', q: 'St. Monica practiced patience by:',
      answers: ['Praying for her son Augustine\'s conversion for over 17 years', 'Giving up after a few months', 'Forcing her son to believe'],
      correct: 0, explanation: 'Monica\'s decades of patient prayer were finally answered — Augustine became a saint.' },

    // ===== FORTITUDE - Bravery =====
    { virtue: 'fortitude', sub: 'bravery', q: 'How is bravery different from recklessness?',
      answers: ['Bravery faces danger for a good reason; recklessness ignores danger foolishly', 'They are the same', 'Bravery means never being scared'],
      correct: 0, explanation: 'True bravery is purposeful courage, not foolish risk-taking.' },
    { virtue: 'fortitude', sub: 'bravery', q: 'The apostles showed bravery after Pentecost by:',
      answers: ['Preaching boldly despite threats of arrest and death', 'Hiding in the upper room', 'Only preaching to friendly audiences'],
      correct: 0, explanation: 'The Holy Spirit transformed the apostles from fearful to fearlessly brave.' },
    { virtue: 'fortitude', sub: 'bravery', q: 'Standing up for someone being mistreated requires bravery because:',
      answers: ['You might face criticism or retaliation, but it\'s the right thing to do', 'It\'s always easy', 'It doesn\'t require any courage'],
      correct: 0, explanation: 'Moral bravery means doing right even when it costs you.' },
    { virtue: 'fortitude', sub: 'bravery', q: 'St. Maximilian Kolbe showed bravery at Auschwitz by:',
      answers: ['Volunteering to take the place of a condemned man', 'Escaping the camp', 'Hiding from the guards'],
      correct: 0, explanation: 'Kolbe\'s brave self-sacrifice saved another man\'s life.' },
    { virtue: 'fortitude', sub: 'bravery', q: 'Joshua was told to "be strong and courageous" because:',
      answers: ['God was with him as he led Israel into the Promised Land', 'He was already fearless', 'He didn\'t need God\'s help'],
      correct: 0, explanation: 'God calls us to bravery and promises to be with us always.' },

    // ===== TEMPERANCE - Moderation =====
    { virtue: 'temperance', sub: 'moderation', q: 'What is moderation?',
      answers: ['Using good things in the right amount, without excess', 'Never enjoying anything', 'Indulging as much as possible'],
      correct: 0, explanation: 'Moderation means enjoying God\'s gifts properly, without going to extremes.' },
    { virtue: 'temperance', sub: 'moderation', q: 'Jesus turned water into wine at Cana, teaching us that:',
      answers: ['Good things are meant to be enjoyed in moderation and with gratitude', 'Wine is always wrong', 'There are no limits on celebration'],
      correct: 0, explanation: 'Jesus blessed celebration — moderation means enjoying gifts with thanksgiving.' },
    { virtue: 'temperance', sub: 'moderation', q: 'Moderation with technology means:',
      answers: ['Using phones and screens in balance with prayer, exercise, and relationships', 'Never using technology', 'Using screens as much as you want'],
      correct: 0, explanation: 'Technology is a tool — moderation helps us use it without it controlling us.' },
    { virtue: 'temperance', sub: 'moderation', q: 'The virtue of moderation helps us with food by:',
      answers: ['Eating enough to nourish our bodies without gluttony', 'Starving ourselves', 'Eating as much as we can'],
      correct: 0, explanation: 'Our bodies are temples of the Holy Spirit — moderation cares for them properly.' },
    { virtue: 'temperance', sub: 'moderation', q: 'Aristotle, whose ideas influenced Catholic teaching, called moderation:',
      answers: ['The golden mean — the balance between excess and deficiency', 'Impossible to achieve', 'Only for philosophers'],
      correct: 0, explanation: 'The golden mean reminds us that virtue lies in balance, not extremes.' },

    // ===== TEMPERANCE - Humility =====
    { virtue: 'temperance', sub: 'humility', q: 'What is humility?',
      answers: ['Knowing your true worth before God — neither too proud nor too self-deprecating', 'Thinking you are worthless', 'Never accepting compliments'],
      correct: 0, explanation: 'Humility is honest self-knowledge — recognizing our gifts come from God.' },
    { virtue: 'temperance', sub: 'humility', q: 'Jesus showed humility by:',
      answers: ['Washing His disciples\' feet at the Last Supper', 'Demanding to be served', 'Only associating with important people'],
      correct: 0, explanation: 'The King of Kings knelt to serve — the ultimate act of humility.' },
    { virtue: 'temperance', sub: 'humility', q: 'Mary\'s Magnificat shows humility because:',
      answers: ['She praised God for His greatness and acknowledged her lowliness', 'She boasted about being chosen', 'She took credit for God\'s work'],
      correct: 0, explanation: 'Mary\'s song gives all glory to God while humbly accepting her role.' },
    { virtue: 'temperance', sub: 'humility', q: 'C.S. Lewis said humility is not:',
      answers: ['Thinking less of yourself, but thinking of yourself less', 'A weakness', 'Only for religious people'],
      correct: 0, explanation: 'True humility focuses outward — on God and others, not on self.' },
    { virtue: 'temperance', sub: 'humility', q: 'When you achieve something great, humility calls you to:',
      answers: ['Thank God and the people who helped you succeed', 'Take all the credit', 'Downplay your achievement as nothing'],
      correct: 0, explanation: 'Humble people celebrate gifts while recognizing God as the source of all good.' },

    // ===== TEMPERANCE - Self-Control =====
    { virtue: 'temperance', sub: 'selfControl', q: 'What is self-control?',
      answers: ['Mastering your impulses and desires through reason and grace', 'Suppressing all emotions', 'Never having any desires'],
      correct: 0, explanation: 'Self-control means directing our desires toward good, not eliminating them.' },
    { virtue: 'temperance', sub: 'selfControl', q: 'Jesus demonstrated self-control when:',
      answers: ['He resisted Satan\'s three temptations in the desert', 'He never felt temptation', 'He gave in to anger at the merchants'],
      correct: 0, explanation: 'Jesus was truly tempted but chose God\'s will — perfect self-control.' },
    { virtue: 'temperance', sub: 'selfControl', q: 'When you\'re angry and want to say something hurtful, self-control means:',
      answers: ['Pausing, breathing, and choosing words that are truthful but kind', 'Saying whatever you feel', 'Never expressing anger at all'],
      correct: 0, explanation: 'Self-control doesn\'t deny emotions — it channels them constructively.' },
    { virtue: 'temperance', sub: 'selfControl', q: 'St. Paul compared the Christian life to:',
      answers: ['An athletic race that requires discipline and self-control', 'A relaxing vacation', 'A game of chance'],
      correct: 0, explanation: '1 Corinthians 9:25 — athletes exercise self-control; so should we in all things.' },
    { virtue: 'temperance', sub: 'selfControl', q: 'Fasting is a practice of self-control because:',
      answers: ['It trains us to master our appetites and depend on God', 'It punishes the body', 'It is outdated and unnecessary'],
      correct: 0, explanation: 'Fasting strengthens our will and turns our hearts toward God.' }
  ];

  const ENEMY_ACTIONS = [
    { name: 'Advance', text: 'All enemy ships move one sector toward the nearest base.' },
    { name: 'Assault', text: 'All enemy ships attack; spawn 1 new ship.' },
    { name: 'Flank', text: 'Half the enemy ships move two sectors toward a base.' },
    { name: 'Regroup', text: 'All enemy ships move one sector away from bases.' },
    { name: 'Ambush', text: 'Enemy ships in player sectors deal double damage.' },
    { name: 'Reinforce', text: 'Spawn 2 new enemy ships in a spawn sector.' }
  ];

  const PLAYER_BASES = [1, 5, 9];
  const ENEMY_SPAWNS = [4, 8, 12];
  const TOTAL_SECTORS = 12;
  const MAX_DAYS = 9;

  // Sector adjacency (1-indexed, circular + connections)
  const ADJACENCY = {};
  for (let i = 1; i <= 12; i++) {
    const adj = [];
    if (i > 1) adj.push(i - 1);
    if (i < 12) adj.push(i + 1);
    if (i === 1) adj.push(12);
    if (i === 12) adj.push(1);
    // Cross-connections through Earth: opposite sectors
    const opp = ((i - 1 + 6) % 12) + 1;
    adj.push(opp);
    ADJACENCY[i] = [...new Set(adj)];
  }

  // ===== Game State =====
  let state = null;

  function newState(playerCount) {
    const shipsPerPlayer = Math.floor(12 / playerCount);
    const playerShips = SAINT_NAMES.map((name, i) => ({
      id: i,
      name,
      health: 3,
      maxHealth: 3,
      charge: 0,
      maxCharge: 3,
      sector: PLAYER_BASES[i % 3],
      player: i % playerCount,
      acted: false,
      destroyed: false,
      charge: 1
    }));

    const enemyShips = [];
    for (let i = 0; i < 24; i++) {
      enemyShips.push({
        id: i,
        name: `Enemy Ship ${i + 1}`,
        health: 2,
        maxHealth: 2,
        sector: ENEMY_SPAWNS[i % 3],
        deployed: i < 6,
        destroyed: false
      });
    }

    // Build virtue progress tracker
    const virtueProgress = {};
    Object.keys(VIRTUES).forEach(v => {
      virtueProgress[v] = {};
      VIRTUES[v].subVirtues.forEach(s => { virtueProgress[v][s] = 0; });
    });

    return {
      playerCount,
      day: 1,
      turnIndex: 0,
      playerShips,
      enemyShips,
      virtuePoints: 0,
      selectedShip: null,
      enemiesDefeated: 0,
      totalEnemySpawned: 6,
      phase: 'play', // play, selectTarget, selectSector, virtueChallenge, gameOver
      message: null,
      basesIntact: { 1: true, 5: true, 9: true },
      baseHealth: { 1: 3, 5: 3, 9: 3 },
      sunday: false,
      virtueProgress,
      virtuesMastered: [],
      answeredQuestions: [], // indices into VIRTUE_QUESTIONS that were answered correctly
      currentQuestion: null  // currently displayed virtue question
    };
  }

  // ===== Virtue Helpers =====
  function isSubVirtueMastered(virtue, sub) {
    return state.virtueProgress[virtue][sub] >= 3;
  }

  function isVirtueMastered(virtue) {
    return VIRTUES[virtue].subVirtues.every(s => isSubVirtueMastered(virtue, s));
  }

  function checkVirtueMastery() {
    Object.keys(VIRTUES).forEach(v => {
      if (!state.virtuesMastered.includes(v) && isVirtueMastered(v)) {
        state.virtuesMastered.push(v);
        applyVirtueBonus(v);
        showCard('Virtue Mastered!', `${VIRTUES[v].name} mastered! Bonus: ${VIRTUES[v].bonus}`);
      }
    });
  }

  function applyVirtueBonus(virtue) {
    switch (virtue) {
      case 'faith':
        state.playerShips.forEach(s => { s.maxCharge = 4; });
        break;
      case 'hope':
        state.playerShips.forEach(s => { if (!s.destroyed) s.maxHealth = 4; });
        break;
    }
  }

  function getRandomQuestion() {
    // Get unanswered questions, or if all answered, pick any
    const unanswered = VIRTUE_QUESTIONS.map((q, i) => i)
      .filter(i => !state.answeredQuestions.includes(i));
    const pool = unanswered.length > 0 ? unanswered : VIRTUE_QUESTIONS.map((_, i) => i);
    // Prefer questions for sub-virtues not yet mastered
    const unmasteredPool = pool.filter(i => {
      const q = VIRTUE_QUESTIONS[i];
      return !isSubVirtueMastered(q.virtue, q.sub);
    });
    const finalPool = unmasteredPool.length > 0 ? unmasteredPool : pool;
    return finalPool[Math.floor(Math.random() * finalPool.length)];
  }

  function startVirtueChallenge() {
    const qIndex = getRandomQuestion();
    const question = VIRTUE_QUESTIONS[qIndex];
    state.currentQuestion = { index: qIndex, ...question };
    state.phase = 'virtueChallenge';
    showVirtueQuestion(state.currentQuestion);
  }

  function answerVirtueQuestion(answerIndex) {
    const q = state.currentQuestion;
    if (!q) return;

    const correct = answerIndex === q.correct;
    const ship = state.playerShips[state.selectedShip];
    const isSunday = state.sunday;

    if (correct) {
      const gain = isSunday ? 2 : 1;
      state.virtueProgress[q.virtue][q.sub] = Math.min(3, state.virtueProgress[q.virtue][q.sub] + gain);
      state.answeredQuestions.push(q.index);

      const subName = VIRTUES[q.virtue].subNames[q.sub];
      const progress = state.virtueProgress[q.virtue][q.sub];
      showVirtueResult(true,
        `Correct! +${gain} ${VIRTUES[q.virtue].name} (${subName}: ${progress}/3)`,
        q.explanation);

      // Charity bonus: heal adjacent allies when praying
      if (state.virtuesMastered.includes('charity') && ship) {
        const adj = ADJACENCY[ship.sector];
        state.playerShips.filter(s => !s.destroyed && adj.includes(s.sector))
          .forEach(s => { s.health = Math.min(s.maxHealth, s.health + 1); });
      }

      checkVirtueMastery();
    } else {
      state.virtuePoints++;
      showVirtueResult(false,
        `Not quite. +1 VP (consolation).`,
        q.explanation);
    }

    if (ship) ship.acted = true;
    state.currentQuestion = null;
    state.phase = 'play';
  }

  // ===== Board Rendering =====
  const canvas = document.getElementById('game-board');
  const ctx = canvas.getContext('2d');
  let boardLayout = []; // {sector, x, y, r}

  function resizeCanvas() {
    const container = document.getElementById('board-container');
    canvas.width = container.clientWidth * devicePixelRatio;
    canvas.height = container.clientHeight * devicePixelRatio;
    canvas.style.width = container.clientWidth + 'px';
    canvas.style.height = container.clientHeight + 'px';
    ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
    computeLayout();
    drawBoard();
  }

  function computeLayout() {
    const w = canvas.width / devicePixelRatio;
    const h = canvas.height / devicePixelRatio;
    const cx = w / 2;
    const cy = h / 2;
    const radius = Math.min(w, h) * 0.38;
    const sectorR = Math.min(w, h) * 0.07;

    boardLayout = [];
    // Earth at center
    boardLayout.push({ sector: 0, x: cx, y: cy, r: sectorR * 0.9, label: 'Earth' });

    // 12 sectors in a circle
    for (let i = 0; i < 12; i++) {
      const angle = (i * Math.PI * 2) / 12 - Math.PI / 2;
      boardLayout.push({
        sector: i + 1,
        x: cx + Math.cos(angle) * radius,
        y: cy + Math.sin(angle) * radius,
        r: sectorR,
        label: `${i + 1}`
      });
    }
  }

  function drawBoard() {
    if (!state) return;
    const w = canvas.width / devicePixelRatio;
    const h = canvas.height / devicePixelRatio;
    ctx.clearRect(0, 0, w, h);

    // Draw connections
    ctx.strokeStyle = '#1e2a3f';
    ctx.lineWidth = 1;
    for (let i = 1; i <= 12; i++) {
      const a = boardLayout[i];
      // Connection to next sector
      const next = (i % 12) + 1;
      const b = boardLayout[next];
      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.lineTo(b.x, b.y);
      ctx.stroke();
      // Connection through Earth
      const opp = ((i - 1 + 6) % 12) + 1;
      if (opp > i) {
        const c = boardLayout[opp];
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(boardLayout[0].x, boardLayout[0].y);
        ctx.lineTo(c.x, c.y);
        ctx.stroke();
      }
    }

    // Draw sectors
    boardLayout.forEach((s) => {
      const isBase = PLAYER_BASES.includes(s.sector);
      const isSpawn = ENEMY_SPAWNS.includes(s.sector);
      const isEarth = s.sector === 0;

      // Fill
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      if (isEarth) {
        ctx.fillStyle = '#0d2137';
      } else if (isBase) {
        ctx.fillStyle = state.basesIntact[s.sector] ? '#0a1e2e' : '#2e0a0a';
      } else if (isSpawn) {
        ctx.fillStyle = '#1e0a0a';
      } else {
        ctx.fillStyle = '#0e1524';
      }
      ctx.fill();

      // Border
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      if (isBase) {
        ctx.strokeStyle = state.basesIntact[s.sector] ? '#00918B' : '#c0392b';
      } else if (isSpawn) {
        ctx.strokeStyle = '#8B0000';
      } else if (isEarth) {
        ctx.strokeStyle = '#00B5AD';
      } else {
        ctx.strokeStyle = '#2a3548';
      }
      ctx.lineWidth = isEarth ? 2 : 1.5;
      ctx.stroke();

      // Label
      ctx.fillStyle = isEarth ? '#00B5AD' : '#556677';
      ctx.font = `${isEarth ? 'bold ' : ''}${s.r * 0.45}px -apple-system, sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(s.label, s.x, s.y - s.r * 0.45);

      if (isBase && s.sector !== 0) {
        ctx.fillStyle = '#00918B';
        ctx.font = `${s.r * 0.25}px -apple-system, sans-serif`;
        ctx.fillText('BASE', s.x, s.y - s.r * 0.15);
      }
      if (isSpawn) {
        ctx.fillStyle = '#8B0000';
        ctx.font = `${s.r * 0.25}px -apple-system, sans-serif`;
        ctx.fillText('SPAWN', s.x, s.y - s.r * 0.15);
      }

      // Ship indicators in sector
      if (s.sector > 0) {
        const pShips = state.playerShips.filter(sh => sh.sector === s.sector && !sh.destroyed);
        const eShips = state.enemyShips.filter(sh => sh.sector === s.sector && sh.deployed && !sh.destroyed);

        // Player ship dots
        if (pShips.length > 0) {
          const dotR = s.r * 0.1;
          const startX = s.x - (pShips.length - 1) * dotR * 1.5;
          pShips.forEach((sh, idx) => {
            ctx.beginPath();
            ctx.arc(startX + idx * dotR * 3, s.y + s.r * 0.2, dotR, 0, Math.PI * 2);
            ctx.fillStyle = state.selectedShip === sh.id ? '#00FFE5' : '#00B5AD';
            ctx.fill();
          });
          ctx.fillStyle = '#00B5AD';
          ctx.font = `${s.r * 0.22}px -apple-system, sans-serif`;
          ctx.fillText(`${pShips.length} ship${pShips.length > 1 ? 's' : ''}`, s.x, s.y + s.r * 0.55);
        }

        // Enemy ship indicators
        if (eShips.length > 0) {
          ctx.fillStyle = '#e74c3c';
          ctx.font = `bold ${s.r * 0.25}px -apple-system, sans-serif`;
          ctx.fillText(`${eShips.length}`, s.x, s.y + s.r * 0.75);
          // small skull-ish indicator
          ctx.font = `${s.r * 0.18}px -apple-system, sans-serif`;
          ctx.fillText('enemy', s.x, s.y + s.r * 0.55);
        }
      }
    });

    // Highlight selectable sectors if in selectSector phase
    if (state.phase === 'selectSector' && state.selectableSectors) {
      state.selectableSectors.forEach(sectorNum => {
        const s = boardLayout[sectorNum];
        if (!s) return;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r + 3, 0, Math.PI * 2);
        ctx.strokeStyle = '#00FFE5';
        ctx.lineWidth = 2;
        ctx.setLineDash([4, 4]);
        ctx.stroke();
        ctx.setLineDash([]);
      });
    }
  }

  // ===== Ship Tray =====
  function renderShipTray() {
    const list = document.getElementById('ship-list');
    list.innerHTML = '';

    const myShips = state.playerShips;
    myShips.forEach(ship => {
      const card = document.createElement('div');
      card.className = 'ship-card' +
        (state.selectedShip === ship.id ? ' selected' : '') +
        (ship.destroyed ? ' destroyed' : '');

      let healthPips = '';
      for (let i = 0; i < ship.maxHealth; i++) {
        healthPips += `<span class="stat-pip health ${i < ship.health ? 'filled' : ''}"></span>`;
      }
      let chargePips = '';
      for (let i = 0; i < ship.maxCharge; i++) {
        chargePips += `<span class="stat-pip charge ${i < ship.charge ? 'filled' : ''}"></span>`;
      }

      card.innerHTML = `
        <div class="ship-name">${ship.name}</div>
        <div class="ship-stat">HP <span class="stat-bar">${healthPips}</span></div>
        <div class="ship-stat">CHG <span class="stat-bar">${chargePips}</span></div>
        <div class="ship-sector">Sector ${ship.sector}${ship.acted ? ' (acted)' : ''}</div>
      `;

      card.addEventListener('click', () => {
        if (ship.destroyed) return;
        state.selectedShip = state.selectedShip === ship.id ? null : ship.id;
        renderShipTray();
        drawBoard();
        if (state.selectedShip !== null) showActionPanel();
        else hideActionPanel();
      });

      list.appendChild(card);
    });
  }

  // ===== Actions =====
  function showActionPanel() {
    const panel = document.getElementById('action-panel');
    const btnContainer = document.getElementById('action-buttons');
    const title = document.getElementById('action-title');
    panel.classList.remove('hidden');

    const ship = state.playerShips[state.selectedShip];
    if (!ship) { hideActionPanel(); return; }

    title.textContent = ship.name + (ship.acted ? ' (already acted)' : '');

    const turn = TURNS[state.turnIndex];
    const isSunday = state.sunday;

    // Determine available actions based on turn
    const actions = [];

    if (isSunday) {
      actions.push({ label: 'Pray (Virtue x2)', id: 'pray', enabled: !ship.acted });
    } else {
      if (turn === 'Lauds') {
        actions.push({ label: 'Pray (Virtue Challenge)', id: 'pray', enabled: !ship.acted });
      } else if (turn === 'Prime') {
        actions.push({ label: 'Draw Card', id: 'drawCard', enabled: !ship.acted });
      } else if (turn === 'Terce' || turn === 'Vespers') {
        actions.push({ label: 'Move', id: 'move', enabled: !ship.acted });
        const enemiesHere = state.enemyShips.filter(e => e.sector === ship.sector && e.deployed && !e.destroyed);
        actions.push({ label: `Attack (${Math.max(1, ship.charge)} dmg)`, id: 'attack', enabled: !ship.acted && enemiesHere.length > 0 });
      } else if (turn === 'Sext') {
        actions.push({ label: 'Charge', id: 'charge', enabled: !ship.acted && ship.charge < ship.maxCharge });
        actions.push({ label: 'Repair', id: 'repair', enabled: !ship.acted && ship.health < ship.maxHealth });
      } else if (turn === 'None') {
        actions.push({ label: 'Pray (Virtue Challenge)', id: 'pray', enabled: !ship.acted });
        actions.push({ label: 'Virtue Heal', id: 'virtueHeal', enabled: !ship.acted && state.virtuePoints >= 2 });
      } else if (turn === 'Compline') {
        actions.push({ label: 'Rest (auto-heal)', id: 'rest', enabled: !ship.acted });
      }
    }

    btnContainer.innerHTML = '';
    actions.forEach(a => {
      const btn = document.createElement('button');
      btn.className = 'action-btn';
      btn.textContent = a.label;
      btn.disabled = !a.enabled;
      btn.addEventListener('click', () => performAction(a.id));
      btnContainer.appendChild(btn);
    });
  }

  function hideActionPanel() {
    document.getElementById('action-panel').classList.add('hidden');
  }

  function performAction(actionId) {
    const ship = state.playerShips[state.selectedShip];
    if (!ship || ship.acted) return;

    switch (actionId) {
      case 'pray':
        startVirtueChallenge();
        return; // Don't updateUI yet — wait for question answer

      case 'drawCard':
        ship.acted = true;
        drawCatholicCard();
        break;

      case 'move':
        state.phase = 'selectSector';
        state.selectableSectors = ADJACENCY[ship.sector];
        hideActionPanel();
        drawBoard();
        showMessage('Tap a highlighted sector to move.');
        return;

      case 'attack': {
        const enemies = state.enemyShips.filter(e => e.sector === ship.sector && e.deployed && !e.destroyed);
        if (enemies.length === 0) return;
        let dmg = Math.max(1, ship.charge);
        // Justice bonus: +1 attack damage
        if (state.virtuesMastered.includes('justice')) dmg += 1;
        const target = enemies[0];
        target.health -= dmg;
        // Temperance bonus: keep 1 charge instead of resetting to 0
        ship.charge = state.virtuesMastered.includes('temperance') ? Math.min(1, ship.charge) : 0;
        ship.acted = true;
        const bonusText = state.virtuesMastered.includes('justice') ? ' (Justice +1)' : '';
        if (target.health <= 0) {
          target.destroyed = true;
          state.enemiesDefeated++;
          showMessage(`${ship.name} destroys ${target.name}! (${dmg} dmg${bonusText})`);
        } else {
          showMessage(`${ship.name} hits ${target.name} for ${dmg} dmg${bonusText}. (${target.health} HP left)`);
        }
        break;
      }

      case 'charge':
        if (ship.charge < ship.maxCharge) {
          ship.charge++;
          ship.acted = true;
          showMessage(`${ship.name} charges up! (${ship.charge}/${ship.maxCharge})`);
        }
        break;

      case 'repair':
        if (ship.health < ship.maxHealth) {
          ship.health++;
          ship.acted = true;
          showMessage(`${ship.name} repairs. (${ship.health}/${ship.maxHealth} HP)`);
        }
        break;

      case 'rest':
        if (ship.health < ship.maxHealth) ship.health++;
        ship.acted = true;
        showMessage(`${ship.name} rests. Healed to ${ship.health}/${ship.maxHealth} HP.`);
        break;

      case 'virtueHeal':
        if (state.virtuePoints >= 2) {
          state.virtuePoints -= 2;
          ship.health = Math.min(ship.maxHealth, ship.health + 2);
          ship.acted = true;
          showMessage(`${ship.name} uses virtue to heal! (-2 VP, ${ship.health}/${ship.maxHealth} HP)`);
        }
        break;
    }

    updateUI();
  }

  function drawCatholicCard() {
    const card = CATHOLIC_ACTIONS[Math.floor(Math.random() * CATHOLIC_ACTIONS.length)];
    showCard('Catholic Action', `${card.name}: ${card.text}`);
    applyCatholicCard(card);
  }

  function applyCatholicCard(card) {
    switch (card.effect) {
      case 'virtue2':
        state.virtuePoints += 2;
        break;
      case 'healSector': {
        const ship = state.playerShips[state.selectedShip];
        if (ship) {
          state.playerShips.filter(s => s.sector === ship.sector && !s.destroyed).forEach(s => {
            s.health = Math.min(s.maxHealth, s.health + 1);
          });
        }
        break;
      }
      case 'removeEnemy': {
        const deployed = state.enemyShips.filter(e => e.deployed && !e.destroyed);
        if (deployed.length > 0) {
          const target = deployed[Math.floor(Math.random() * deployed.length)];
          target.destroyed = true;
          state.enemiesDefeated++;
        }
        break;
      }
      case 'virtue3':
        state.virtuePoints += 3;
        break;
      case 'healAll':
        state.playerShips.filter(s => !s.destroyed).forEach(s => {
          s.health = Math.min(s.maxHealth, s.health + 1);
        });
        break;
      case 'virtue1draw':
        state.virtuePoints += 1;
        // Draw another card after dismissing this one
        setTimeout(() => drawCatholicCard(), 500);
        break;
    }
  }

  // ===== Enemy Turn =====
  function enemyTurn() {
    const card = state.prudencePreview || ENEMY_ACTIONS[Math.floor(Math.random() * ENEMY_ACTIONS.length)];
    state.prudencePreview = null;
    showCard('Enemy Action', `${card.name}: ${card.text}`);

    const deployed = state.enemyShips.filter(e => e.deployed && !e.destroyed);

    switch (card.name) {
      case 'Advance':
        deployed.forEach(e => {
          const nearest = findNearestBase(e.sector);
          const path = findPathToward(e.sector, nearest);
          if (path !== e.sector) e.sector = path;
        });
        break;

      case 'Assault':
        // Each enemy attacks a player ship in their sector
        deployed.forEach(e => {
          const targets = state.playerShips.filter(s => s.sector === e.sector && !s.destroyed);
          if (targets.length > 0) {
            const t = targets[Math.floor(Math.random() * targets.length)];
            let dmg = 1;
            // Fortitude bonus: reduce incoming damage by 1 (min 0)
            if (state.virtuesMastered.includes('fortitude')) dmg = Math.max(0, dmg - 1);
            t.health -= dmg;
            if (t.health <= 0) { t.health = 0; t.destroyed = true; }
          }
        });
        spawnEnemies(1);
        break;

      case 'Flank':
        const half = deployed.slice(0, Math.ceil(deployed.length / 2));
        half.forEach(e => {
          const nearest = findNearestBase(e.sector);
          let s = findPathToward(e.sector, nearest);
          s = findPathToward(s, nearest);
          e.sector = s;
        });
        break;

      case 'Regroup':
        deployed.forEach(e => {
          const nearest = findNearestBase(e.sector);
          const path = findPathAway(e.sector, nearest);
          if (path !== e.sector) e.sector = path;
        });
        break;

      case 'Ambush':
        deployed.forEach(e => {
          const targets = state.playerShips.filter(s => s.sector === e.sector && !s.destroyed);
          targets.forEach(t => {
            let dmg = 2;
            // Fortitude bonus: reduce incoming damage by 1
            if (state.virtuesMastered.includes('fortitude')) dmg = Math.max(1, dmg - 1);
            t.health -= dmg;
            if (t.health <= 0) { t.health = 0; t.destroyed = true; }
          });
        });
        break;

      case 'Reinforce':
        spawnEnemies(2);
        break;
    }

    // Check if enemy ships are on bases
    checkBases();
  }

  function findNearestBase(sector) {
    let best = null;
    let bestDist = Infinity;
    PLAYER_BASES.forEach(b => {
      if (!state.basesIntact[b]) return;
      const d = sectorDistance(sector, b);
      if (d < bestDist) { bestDist = d; best = b; }
    });
    return best || PLAYER_BASES[0];
  }

  function sectorDistance(a, b) {
    const diff = Math.abs(a - b);
    return Math.min(diff, 12 - diff);
  }

  function findPathToward(from, to) {
    if (from === to) return from;
    const adj = ADJACENCY[from];
    let best = from;
    let bestDist = sectorDistance(from, to);
    adj.forEach(s => {
      const d = sectorDistance(s, to);
      if (d < bestDist) { bestDist = d; best = s; }
    });
    return best;
  }

  function findPathAway(from, to) {
    const adj = ADJACENCY[from];
    let best = from;
    let bestDist = sectorDistance(from, to);
    adj.forEach(s => {
      const d = sectorDistance(s, to);
      if (d > bestDist) { bestDist = d; best = s; }
    });
    return best;
  }

  function spawnEnemies(count) {
    let spawned = 0;
    for (let i = 0; i < state.enemyShips.length && spawned < count; i++) {
      if (!state.enemyShips[i].deployed && !state.enemyShips[i].destroyed) {
        state.enemyShips[i].deployed = true;
        state.totalEnemySpawned++;
        spawned++;
      }
    }
  }

  function checkBases() {
    PLAYER_BASES.forEach(base => {
      if (!state.basesIntact[base]) return;
      const enemies = state.enemyShips.filter(e => e.sector === base && e.deployed && !e.destroyed);
      const defenders = state.playerShips.filter(s => s.sector === base && !s.destroyed);
      // Base takes damage if enemies present and no defenders
      if (enemies.length > 0 && defenders.length === 0) {
        state.baseHealth[base] -= enemies.length;
        if (state.baseHealth[base] <= 0) {
          state.basesIntact[base] = false;
        }
      }
    });

    // Check lose condition
    const allBasesLost = PLAYER_BASES.every(b => !state.basesIntact[b]);
    if (allBasesLost) {
      endGame(false);
    }
  }

  // ===== Turn / Day Management =====
  function endTurn() {
    // Reset acted flags
    state.playerShips.forEach(s => s.acted = false);

    // Enemy phase (after player acts, except Lauds and Compline)
    const turn = TURNS[state.turnIndex];
    if (!state.sunday && turn !== 'Lauds' && turn !== 'Compline') {
      enemyTurn();
    }

    // Advance turn
    state.turnIndex++;
    if (state.turnIndex >= TURNS.length) {
      state.turnIndex = 0;
      state.day++;
      state.sunday = (state.day % 7 === 0);

      if (state.day > MAX_DAYS) {
        endGame(true);
        return;
      }
    }

    // Prudence bonus: preview next enemy action
    const nextTurn = TURNS[state.turnIndex];
    if (state.virtuesMastered.includes('prudence') && !state.sunday &&
        nextTurn !== 'Lauds' && nextTurn !== 'Compline') {
      const preview = ENEMY_ACTIONS[Math.floor(Math.random() * ENEMY_ACTIONS.length)];
      state.prudencePreview = preview;
      showCard('Prudence Foresight', `Enemy plans: ${preview.name} — ${preview.text}`);
    }

    state.selectedShip = null;
    state.phase = 'play';
    hideActionPanel();
    updateUI();
  }

  function endGame(won) {
    state.phase = 'gameOver';
    const allDefeated = state.enemyShips.every(e => e.destroyed);

    document.getElementById('gameover-title').textContent = won ? 'Victory!' : 'Defeat';
    document.getElementById('gameover-title').style.color = won ? '#00B5AD' : '#c0392b';
    document.getElementById('gameover-message').textContent = won
      ? (allDefeated ? 'Total Victory! You defeated all enemy ships and protected every colony!' : 'You survived 9 days and defended the colonies!')
      : 'All bases have fallen. The colonies are lost.';
    const masteredNames = state.virtuesMastered.map(v => VIRTUES[v].name).join(', ') || 'None';
    document.getElementById('gameover-stats').textContent =
      `Day ${Math.min(state.day, MAX_DAYS)} | Enemies: ${state.enemiesDefeated}/24 | Virtues Mastered: ${masteredNames}`;

    showScreen('gameover-screen');
  }

  // ===== UI Helpers =====
  function showScreen(id) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(id).classList.add('active');
    if (id === 'game-screen') {
      setTimeout(resizeCanvas, 50);
    }
  }

  function updateUI() {
    document.getElementById('day-display').textContent =
      `Day ${state.day}${state.sunday ? ' (Sunday)' : ''}`;
    document.getElementById('turn-display').textContent = TURNS[state.turnIndex];
    document.getElementById('virtue-display').textContent = `VP: ${state.virtuePoints}`;
    renderShipTray();
    drawBoard();
    if (state.selectedShip !== null) showActionPanel();
  }

  function showMessage(text) {
    // Brief toast-style message in the action title
    const title = document.getElementById('action-title');
    title.textContent = text;
  }

  function showCard(type, text) {
    const overlay = document.getElementById('card-overlay');
    document.getElementById('card-type').textContent = type;
    document.getElementById('card-text').textContent = text;
    overlay.classList.remove('hidden');
  }

  function showVirtueQuestion(q) {
    const overlay = document.getElementById('virtue-overlay');
    const header = document.getElementById('virtue-question-header');
    const text = document.getElementById('virtue-question-text');
    const answersDiv = document.getElementById('virtue-answers');

    header.textContent = `${VIRTUES[q.virtue].name} — ${VIRTUES[q.virtue].subNames[q.sub]}`;
    text.textContent = q.q;
    answersDiv.innerHTML = '';

    // Shuffle answer display order but track correct index
    const indices = q.answers.map((_, i) => i);
    for (let i = indices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [indices[i], indices[j]] = [indices[j], indices[i]];
    }

    indices.forEach(origIndex => {
      const btn = document.createElement('button');
      btn.className = 'virtue-answer-btn';
      btn.textContent = q.answers[origIndex];
      btn.addEventListener('click', () => {
        overlay.classList.add('hidden');
        answerVirtueQuestion(origIndex);
        updateUI();
      });
      answersDiv.appendChild(btn);
    });

    overlay.classList.remove('hidden');
  }

  function showVirtueResult(correct, message, explanation) {
    const overlay = document.getElementById('virtue-result-overlay');
    document.getElementById('virtue-result-icon').textContent = correct ? '✓' : '✗';
    document.getElementById('virtue-result-icon').style.color = correct ? '#00B5AD' : '#c0392b';
    document.getElementById('virtue-result-text').textContent = message;
    document.getElementById('virtue-result-explanation').textContent = explanation;
    overlay.classList.remove('hidden');
  }

  function showStatus() {
    const overlay = document.getElementById('status-overlay');
    const details = document.getElementById('status-details');

    let html = '<div class="status-section"><h4>Player Ships</h4>';
    state.playerShips.forEach(s => {
      html += `<div class="status-ship player">
        <span>${s.name}${s.destroyed ? ' (destroyed)' : ''}</span>
        <span>S${s.sector} | HP ${s.health}/${s.maxHealth} | CHG ${s.charge}</span>
      </div>`;
    });
    html += '</div>';

    html += '<div class="status-section"><h4>Enemy Ships</h4>';
    const deployed = state.enemyShips.filter(e => e.deployed && !e.destroyed);
    if (deployed.length === 0) {
      html += '<div class="status-ship enemy"><span>No enemies deployed</span></div>';
    }
    deployed.forEach(e => {
      html += `<div class="status-ship enemy">
        <span>${e.name}</span>
        <span>S${e.sector} | HP ${e.health}/${e.maxHealth}</span>
      </div>`;
    });
    html += '</div>';

    html += '<div class="status-section"><h4>Bases</h4>';
    PLAYER_BASES.forEach(b => {
      html += `<div class="status-ship ${state.basesIntact[b] ? 'player' : 'enemy'}">
        <span>Sector ${b}</span>
        <span>${state.basesIntact[b] ? `Intact (${state.baseHealth[b]} HP)` : 'Fallen'}</span>
      </div>`;
    });
    html += '</div>';

    html += `<div class="status-section"><h4>Stats</h4>
      <div class="status-ship player"><span>Enemies Defeated</span><span>${state.enemiesDefeated}/24</span></div>
      <div class="status-ship player"><span>Virtue Points</span><span>${state.virtuePoints}</span></div>
      <div class="status-ship player"><span>Day</span><span>${state.day} of ${MAX_DAYS}</span></div>
    </div>`;

    // Virtue Progress Tree
    html += '<div class="status-section"><h4>Virtue Progress</h4><div class="virtue-tree">';
    Object.keys(VIRTUES).forEach(v => {
      const virtue = VIRTUES[v];
      const mastered = state.virtuesMastered.includes(v);
      html += `<div class="virtue-row ${mastered ? 'mastered' : 'unmastered'}">
        <div class="virtue-row-header">
          <span class="virtue-row-name ${mastered ? 'mastered' : 'unmastered'}">${virtue.name}${mastered ? ' ✓' : ''}</span>
          <span class="virtue-row-bonus">${mastered ? virtue.bonusShort + ' ACTIVE' : virtue.bonus}</span>
        </div>
        <div class="sub-virtues">`;
      virtue.subVirtues.forEach(sub => {
        const progress = state.virtueProgress[v][sub];
        let pips = '';
        for (let i = 0; i < 3; i++) {
          pips += `<span class="sub-pip ${i < progress ? 'filled' : ''}"></span>`;
        }
        html += `<div class="sub-virtue">
          <div class="sub-virtue-name">${virtue.subNames[sub]}</div>
          <div class="sub-virtue-pips">${pips}</div>
        </div>`;
      });
      html += '</div></div>';
    });
    html += '</div></div>';

    details.innerHTML = html;
    overlay.classList.remove('hidden');
  }

  // ===== Board Click Handling =====
  canvas.addEventListener('click', (e) => {
    if (!state) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Find clicked sector
    for (let i = 1; i < boardLayout.length; i++) {
      const s = boardLayout[i];
      const dx = x - s.x;
      const dy = y - s.y;
      if (dx * dx + dy * dy <= s.r * s.r) {
        handleSectorClick(s.sector);
        return;
      }
    }
  });

  function handleSectorClick(sector) {
    if (state.phase === 'selectSector') {
      const ship = state.playerShips[state.selectedShip];
      if (state.selectableSectors && state.selectableSectors.includes(sector)) {
        ship.sector = sector;
        ship.acted = true;
        state.phase = 'play';
        state.selectableSectors = null;
        showMessage(`${ship.name} moves to sector ${sector}.`);
        updateUI();
      }
    }
  }

  // ===== Event Listeners =====
  function init() {
    // Player count selection
    document.querySelectorAll('.player-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.player-btn').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
      });
    });

    // Start game
    document.getElementById('start-btn').addEventListener('click', () => {
      const count = parseInt(document.querySelector('.player-btn.selected').dataset.count);
      state = newState(count);
      showScreen('game-screen');
      updateUI();
    });

    // Rules
    document.getElementById('rules-btn').addEventListener('click', () => showScreen('rules-screen'));

    // Back buttons
    document.querySelectorAll('.back-btn').forEach(btn => {
      btn.addEventListener('click', () => showScreen(btn.dataset.target));
    });

    // End turn
    document.getElementById('end-turn-btn').addEventListener('click', endTurn);

    // Cancel action
    document.getElementById('cancel-action').addEventListener('click', () => {
      state.selectedShip = null;
      state.phase = 'play';
      state.selectableSectors = null;
      hideActionPanel();
      renderShipTray();
      drawBoard();
    });

    // Card dismiss
    document.getElementById('card-dismiss').addEventListener('click', () => {
      document.getElementById('card-overlay').classList.add('hidden');
      updateUI();
    });

    // Virtue result dismiss
    document.getElementById('virtue-result-dismiss').addEventListener('click', () => {
      document.getElementById('virtue-result-overlay').classList.add('hidden');
      updateUI();
    });

    // Toggle ship tray
    document.getElementById('toggle-tray').addEventListener('click', () => {
      document.getElementById('ship-tray').classList.toggle('collapsed');
    });

    // Menu
    document.getElementById('menu-btn').addEventListener('click', () => {
      document.getElementById('game-menu').classList.remove('hidden');
    });
    document.getElementById('menu-close').addEventListener('click', () => {
      document.getElementById('game-menu').classList.add('hidden');
    });
    document.getElementById('menu-rules').addEventListener('click', () => {
      document.getElementById('game-menu').classList.add('hidden');
      showScreen('rules-screen');
      document.querySelector('#rules-screen .back-btn').dataset.target = 'game-screen';
    });
    document.getElementById('menu-status').addEventListener('click', () => {
      document.getElementById('game-menu').classList.add('hidden');
      showStatus();
    });
    document.getElementById('menu-quit').addEventListener('click', () => {
      document.getElementById('game-menu').classList.add('hidden');
      state = null;
      showScreen('title-screen');
      document.querySelector('#rules-screen .back-btn').dataset.target = 'title-screen';
    });
    document.getElementById('close-status').addEventListener('click', () => {
      document.getElementById('status-overlay').classList.add('hidden');
    });

    // Play again
    document.getElementById('play-again-btn').addEventListener('click', () => {
      state = null;
      showScreen('title-screen');
    });

    // Resize
    window.addEventListener('resize', () => {
      if (state && document.getElementById('game-screen').classList.contains('active')) {
        resizeCanvas();
      }
    });

    // Register service worker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('sw.js').catch(() => {});
    }
  }

  init();
})();
