// Stellar Virtue - Virtue Data (Fr. Ripperger Taxonomy)
// Theological virtues are INFUSED (received through grace)
// Cardinal virtues are ACQUIRED (built through practice/moral choices)

// eslint-disable-next-line no-unused-vars
const VIRTUE_DATA = (function () {
  'use strict';

  // ===== CARDINAL VIRTUES (Acquired through practice) =====
  const CARDINAL_VIRTUES = {
    prudence: {
      name: 'Prudence',
      type: 'cardinal',
      subVirtues: ['memory', 'understanding', 'docility', 'shrewdness', 'reason', 'foresight', 'circumspection', 'caution'],
      subNames: {
        memory: 'Memory', understanding: 'Understanding', docility: 'Docility',
        shrewdness: 'Shrewdness', reason: 'Reason', foresight: 'Foresight',
        circumspection: 'Circumspection', caution: 'Caution'
      },
      bonus: 'Preview enemy actions',
      bonusShort: 'FORESIGHT'
    },
    justice: {
      name: 'Justice',
      type: 'cardinal',
      subVirtues: ['religion', 'devotion', 'prayer', 'piety', 'patriotism', 'gratitude', 'truthfulness', 'friendship', 'liberality', 'restitution', 'distributiveJustice', 'commutativeJustice', 'epieikeia'],
      subNames: {
        religion: 'Religion', devotion: 'Devotion', prayer: 'Prayer',
        piety: 'Piety', patriotism: 'Patriotism', gratitude: 'Gratitude',
        truthfulness: 'Truthfulness', friendship: 'Friendship', liberality: 'Liberality',
        restitution: 'Restitution', distributiveJustice: 'Distributive Justice',
        commutativeJustice: 'Commutative Justice', epieikeia: 'Epieikeia'
      },
      bonus: '+1 attack damage',
      bonusShort: 'ATK +1'
    },
    fortitude: {
      name: 'Fortitude',
      type: 'cardinal',
      subVirtues: ['endurance', 'patience', 'magnanimity', 'confidence', 'perseverance', 'daring'],
      subNames: {
        endurance: 'Endurance', patience: 'Patience', magnanimity: 'Magnanimity',
        confidence: 'Confidence', perseverance: 'Perseverance', daring: 'Daring'
      },
      bonus: 'Reduce incoming damage by 1',
      bonusShort: 'DEF +1'
    },
    temperance: {
      name: 'Temperance',
      type: 'cardinal',
      subVirtues: ['abstinence', 'sobriety', 'chastity', 'continence', 'humility', 'meekness', 'clemency', 'modesty'],
      subNames: {
        abstinence: 'Abstinence', sobriety: 'Sobriety', chastity: 'Chastity',
        continence: 'Continence', humility: 'Humility', meekness: 'Meekness',
        clemency: 'Clemency', modesty: 'Modesty'
      },
      bonus: 'Keep 1 charge after attacking',
      bonusShort: 'KEEP CHG'
    }
  };

  // ===== THEOLOGICAL VIRTUES (Infused by God through grace) =====
  const THEOLOGICAL_VIRTUES = {
    faith: {
      name: 'Faith',
      type: 'theological',
      description: 'Assent to the deposit of faith — believing in God and His revelation.',
      bonus: '+1 max charge',
      bonusShort: 'MAX CHG 4'
    },
    hope: {
      name: 'Hope',
      type: 'theological',
      description: 'Confident trust in God\'s promises and desire for eternal life.',
      bonus: '+1 max health',
      bonusShort: 'MAX HP 4'
    },
    charity: {
      name: 'Charity',
      type: 'theological',
      description: 'Love of God above all things and love of neighbor for God\'s sake.',
      bonus: 'Prayer heals adjacent allies',
      bonusShort: 'PRAY HEALS'
    }
  };

  // ===== GIFTS OF THE HOLY SPIRIT =====
  const GIFTS_OF_SPIRIT = [
    { id: 'wisdom', name: 'Wisdom', perfects: 'charity', description: 'Judging all things in light of divine truth.' },
    { id: 'understanding', name: 'Understanding', perfects: 'faith', description: 'Penetrating comprehension of truths of faith.' },
    { id: 'counsel', name: 'Counsel', perfects: 'prudence', description: 'Supernatural intuition to judge rightly in difficult situations.' },
    { id: 'fortitudeGift', name: 'Fortitude', perfects: 'fortitude', description: 'Supernatural strengthening of the soul for practice of virtue.' },
    { id: 'knowledge', name: 'Knowledge', perfects: 'faith', description: 'Understanding created things in relation to God.' },
    { id: 'piety', name: 'Piety', perfects: 'justice', description: 'Loving reverence toward God and docility to His grace.' },
    { id: 'fearOfLord', name: 'Fear of the Lord', perfects: 'temperance', description: 'Filial awe before God\'s majesty.' }
  ];

  // ===== FRUITS OF THE HOLY SPIRIT (12, Vulgate tradition) =====
  const FRUITS_OF_SPIRIT = [
    { id: 'charityFruit', name: 'Charity', unlockCondition: 'charity >= 3', description: 'Selfless love for God and neighbor.' },
    { id: 'joy', name: 'Joy', unlockCondition: 'hope >= 3', description: 'Spiritual gladness rooted in God.' },
    { id: 'peace', name: 'Peace', unlockCondition: 'temperance mastered', description: 'Interior tranquility and harmony with God.' },
    { id: 'longanimity', name: 'Patience', unlockCondition: 'fortitude.patience >= 2', description: 'Forbearance in difficulties.' },
    { id: 'kindness', name: 'Kindness', unlockCondition: 'justice.friendship >= 2', description: 'Benevolence toward others.' },
    { id: 'goodness', name: 'Goodness', unlockCondition: 'justice mastered', description: 'Generosity and uprightness of heart.' },
    { id: 'generosity', name: 'Generosity', unlockCondition: 'justice.liberality >= 2', description: 'Liberality in giving of self.' },
    { id: 'gentleness', name: 'Gentleness', unlockCondition: 'temperance.meekness >= 2', description: 'Absence of harshness.' },
    { id: 'faithfulness', name: 'Faithfulness', unlockCondition: 'faith >= 3', description: 'Fidelity and constancy.' },
    { id: 'modestyFruit', name: 'Modesty', unlockCondition: 'temperance.modesty >= 2', description: 'Propriety and humble demeanor.' },
    { id: 'selfControl', name: 'Self-Control', unlockCondition: 'temperance.continence >= 2', description: 'Mastery over impulses.' },
    { id: 'chastityFruit', name: 'Chastity', unlockCondition: 'temperance.chastity >= 2', description: 'Purity of heart and body.' }
  ];

  // ===== SUNDAY REFLECTIONS =====
  const SUNDAY_REFLECTIONS = [
    { title: 'Sanctifying Grace', text: 'Sanctifying grace is God\'s own life dwelling in your soul — a gratuitous gift that heals sin and makes you holy. It is the foundation of all supernatural life, infused in Baptism.' },
    { title: 'Fidelity to Grace', text: 'Fr. Ripperger teaches that fidelity to grace means remaining responsive and obedient to God\'s promptings. Every time we cooperate with grace, we grow stronger in virtue. Every refusal weakens us.' },
    { title: 'Merit', text: 'No one can merit the initial grace of justification. But moved by the Holy Spirit and charity, we can merit increase of grace, growth in charity, and attainment of eternal life. God freely associates us with the work of His grace.' },
    { title: 'The Theological Virtues', text: 'Faith, Hope, and Charity are not earned by human effort — they are infused directly by God. They are supernatural gifts that orient the soul toward God as its ultimate end. We receive them; we do not build them.' },
    { title: 'Infused vs. Acquired Virtue', text: 'Cardinal virtues can be acquired through practice — repeated good choices strengthen prudence, justice, fortitude, and temperance. But they can also be infused by God, elevated beyond what nature alone can achieve.' },
    { title: 'Fruit: Charity', text: 'The fruit of Charity is selfless love made visible — love that seeks nothing for itself. It flows from the theological virtue of Charity when we cooperate with the Holy Spirit.' },
    { title: 'Fruit: Joy', text: 'Joy is not mere happiness — it is a deep spiritual gladness that persists even in suffering. It springs from Hope, the confident trust that God\'s promises are true.' },
    { title: 'Fruit: Peace', text: 'Peace is the tranquility of order — when our passions are governed by reason and reason is governed by God. It flows from Temperance and right ordering of the soul.' },
    { title: 'Gift: Wisdom', text: 'The Gift of Wisdom perfects Charity, allowing us to judge all things in light of divine truth and to taste the sweetness of God. It is the highest gift of the Holy Spirit.' },
    { title: 'Gift: Counsel', text: 'The Gift of Counsel perfects Prudence, giving us supernatural intuition about the right course of action. It is the Holy Spirit whispering guidance when human reason reaches its limits.' },
    { title: 'Gift: Fortitude', text: 'The Gift of Fortitude perfects the virtue of Fortitude, giving the soul supernatural strength to endure trials, resist temptation, and persevere in doing good beyond natural capacity.' },
    { title: 'Gift: Fear of the Lord', text: 'Fear of the Lord is not servile terror but filial awe — a child\'s reverent love before a Father\'s majesty. It perfects Temperance by making us recoil from offending God.' },
    { title: 'Grace Builds on Nature', text: 'Grace does not destroy nature — it perfects it. The natural virtues (acquired through practice) are the foundation. Grace elevates them, and the Gifts of the Holy Spirit perfect what grace has elevated.' },
    { title: 'Fruit: Patience', text: 'Patience bears difficulties with equanimity, without complaint or despair. It flows from Fortitude — the inner strength that endures suffering for the sake of a greater good.' },
    { title: 'Fruit: Faithfulness', text: 'Faithfulness is constancy and fidelity — remaining true to God, to our promises, and to our state in life. It flows from the theological virtue of Faith.' },
    { title: 'Cooperation with Grace', text: 'God\'s grace is always sufficient, but it requires our free cooperation. We cannot merit initial grace, but we can — and must — freely cooperate with it. This cooperation itself is a gift we must ask for.' },
    { title: 'Fruit: Kindness', text: 'Kindness is benevolence made concrete — treating others with warmth and consideration. It flows from the sub-virtue of Friendship under Justice.' },
    { title: 'Fruit: Self-Control', text: 'Self-Control is mastery over impulses through reason illuminated by grace. It flows from Continence under Temperance — the ability to resist disordered desires.' },
    { title: 'The Seven Gifts', text: 'The seven Gifts of the Holy Spirit — Wisdom, Understanding, Counsel, Fortitude, Knowledge, Piety, Fear of the Lord — are permanent dispositions that make us docile to the promptings of the Holy Spirit.' },
    { title: 'Fruit: Goodness', text: 'Goodness is uprightness of heart and generosity of spirit. It flows from the mastery of Justice — rendering to each person what is due with a generous heart.' }
  ];

  // ===== CARDINAL VIRTUE QUESTIONS (for prayer turns) =====
  // Only cardinal virtues — theological virtues are received, not studied
  const VIRTUE_QUESTIONS = [
    // PRUDENCE - Memory
    { virtue: 'prudence', sub: 'memory', q: 'Memory as a sub-virtue of Prudence means:', answers: ['Recalling past experiences to guide present decisions', 'Having a perfect memory', 'Memorizing rules without understanding'], correct: 0, explanation: 'Prudent memory applies lessons from the past to present situations.' },
    { virtue: 'prudence', sub: 'memory', q: 'A prudent person uses memory to:', answers: ['Learn from past mistakes and successes', 'Dwell on past regrets', 'Forget everything and start fresh'], correct: 0, explanation: 'Memory in Prudence means drawing wisdom from experience.' },
    { virtue: 'prudence', sub: 'memory', q: 'The Israelites were told to remember their deliverance from Egypt because:', answers: ['Remembering God\'s faithfulness guides future trust and obedience', 'It was a nice story', 'They needed to feel guilty'], correct: 0, explanation: 'Remembering God\'s past acts strengthens our prudent trust in Him.' },

    // PRUDENCE - Understanding
    { virtue: 'prudence', sub: 'understanding', q: 'Understanding in Prudence refers to:', answers: ['Grasping the nature of a situation to act wisely', 'Being smarter than others', 'Understanding complex theories'], correct: 0, explanation: 'Prudential understanding means seeing situations clearly to make good choices.' },
    { virtue: 'prudence', sub: 'understanding', q: 'Before making a decision, understanding helps us:', answers: ['Grasp the practical principles at stake', 'Overthink until we can\'t decide', 'Ignore the details'], correct: 0, explanation: 'Understanding illuminates the situation so we can act wisely.' },
    { virtue: 'prudence', sub: 'understanding', q: 'Solomon showed prudential understanding when:', answers: ['He discerned the true mother by proposing to divide the child', 'He built a great temple', 'He collected many proverbs'], correct: 0, explanation: 'Solomon understood human nature and used it to judge wisely.' },

    // PRUDENCE - Docility
    { virtue: 'prudence', sub: 'docility', q: 'Docility means:', answers: ['Willingness to be taught and to take counsel', 'Being obedient without thinking', 'Never questioning authority'], correct: 0, explanation: 'Docility is an openness to learning from those wiser than ourselves.' },
    { virtue: 'prudence', sub: 'docility', q: 'A docile person:', answers: ['Humbly seeks advice from experienced people', 'Ignores all advice', 'Only listens to people they agree with'], correct: 0, explanation: 'Docility means being teachable — a key part of growing in prudence.' },
    { virtue: 'prudence', sub: 'docility', q: 'Why is docility important for prudence?', answers: ['No one has enough experience alone to be perfectly prudent', 'It makes you look humble', 'It avoids responsibility'], correct: 0, explanation: 'We need others\' wisdom because our own experience is limited.' },

    // PRUDENCE - Shrewdness
    { virtue: 'prudence', sub: 'shrewdness', q: 'Shrewdness (solertia) in Prudence means:', answers: ['Quickly finding the right means to achieve a good end', 'Being cunning and deceptive', 'Taking shortcuts'], correct: 0, explanation: 'Shrewdness is quick, accurate judgment about how to act well.' },
    { virtue: 'prudence', sub: 'shrewdness', q: 'Jesus said to be "wise as serpents" which relates to:', answers: ['Shrewdness — being clever in pursuing the good', 'Being sneaky', 'Avoiding all danger'], correct: 0, explanation: 'Christian shrewdness means being smart about doing good.' },
    { virtue: 'prudence', sub: 'shrewdness', q: 'A shrewd decision-maker:', answers: ['Sees opportunities others miss and acts quickly for good', 'Manipulates others', 'Waits too long and misses the moment'], correct: 0, explanation: 'Shrewdness is the ability to seize the right moment for virtuous action.' },

    // PRUDENCE - Reason
    { virtue: 'prudence', sub: 'reason', q: 'Reason in Prudence refers to:', answers: ['Applying universal moral principles to particular situations', 'Abstract philosophical thinking', 'Ignoring emotions entirely'], correct: 0, explanation: 'Practical reason bridges general principles and specific circumstances.' },
    { virtue: 'prudence', sub: 'reason', q: 'St. Thomas Aquinas taught that practical reason:', answers: ['Applies truth to concrete action — "do good, avoid evil"', 'Is inferior to emotion', 'Only matters for scholars'], correct: 0, explanation: 'The first principle of practical reason guides all moral decision-making.' },
    { virtue: 'prudence', sub: 'reason', q: 'When facing a moral dilemma, reason helps by:', answers: ['Weighing principles against circumstances to find the right action', 'Eliminating all uncertainty', 'Always choosing the easiest option'], correct: 0, explanation: 'Reason illuminates the right path through complex situations.' },

    // PRUDENCE - Foresight
    { virtue: 'prudence', sub: 'foresight', q: 'Foresight (providentia) means:', answers: ['Anticipating future consequences of present actions', 'Predicting the future perfectly', 'Worrying about what might happen'], correct: 0, explanation: 'Foresight considers where our choices will likely lead.' },
    { virtue: 'prudence', sub: 'foresight', q: 'Joseph stored grain in Egypt, demonstrating:', answers: ['Foresight — preparing for future need based on present knowledge', 'Greed and hoarding', 'Luck'], correct: 0, explanation: 'Joseph\'s wise planning saved nations from famine.' },
    { virtue: 'prudence', sub: 'foresight', q: 'The parable of the wise and foolish virgins teaches:', answers: ['Foresight in preparing for what we know is coming', 'That sleep is always bad', 'That oil is important'], correct: 0, explanation: 'The wise virgins\' preparation is a model of prudent foresight.' },

    // PRUDENCE - Circumspection
    { virtue: 'prudence', sub: 'circumspection', q: 'Circumspection means:', answers: ['Carefully considering all the circumstances before acting', 'Being suspicious of everyone', 'Looking around nervously'], correct: 0, explanation: 'Circumspection ensures we account for all relevant factors.' },
    { virtue: 'prudence', sub: 'circumspection', q: 'A good action done at the wrong time or place lacks:', answers: ['Circumspection — awareness of circumstances', 'Good intention', 'Courage'], correct: 0, explanation: 'Even good acts need the right circumstances to be truly prudent.' },
    { virtue: 'prudence', sub: 'circumspection', q: 'Jesus told a parable about counting the cost before building. This teaches:', answers: ['Circumspection — examining all circumstances before committing', 'That building is expensive', 'That planning is optional'], correct: 0, explanation: 'Considering circumstances is essential to prudent action.' },

    // PRUDENCE - Caution
    { virtue: 'prudence', sub: 'caution', q: 'Caution (cautio) as a virtue means:', answers: ['Avoiding evil and impediments that could derail good actions', 'Being afraid of everything', 'Never taking any risks'], correct: 0, explanation: 'Caution wisely avoids pitfalls while still pursuing the good.' },
    { virtue: 'prudence', sub: 'caution', q: 'Caution differs from cowardice because:', answers: ['Caution still acts boldly while avoiding unnecessary dangers', 'They are the same', 'Caution never acts'], correct: 0, explanation: 'The cautious person acts — but avoids foreseeable evils.' },
    { virtue: 'prudence', sub: 'caution', q: 'Proverbs teaches that the prudent person:', answers: ['Sees danger ahead and takes precautions', 'Avoids all challenges', 'Never plans ahead'], correct: 0, explanation: 'Caution is wisdom applied to avoiding known dangers.' },

    // JUSTICE - Religion
    { virtue: 'justice', sub: 'religion', q: 'Religion as a sub-virtue of Justice means:', answers: ['Rendering to God the worship and honor that is His due', 'Following rules mechanically', 'Belonging to a church building'], correct: 0, explanation: 'Religion is the justice we owe to God — giving Him proper worship.' },
    { virtue: 'justice', sub: 'religion', q: 'The First Commandment relates to Religion because:', answers: ['We owe God our exclusive worship and total devotion', 'It is the oldest rule', 'It was written on stone'], correct: 0, explanation: 'Religion renders to God the supreme honor He alone deserves.' },
    { virtue: 'justice', sub: 'religion', q: 'The Mass is the highest act of the virtue of Religion because:', answers: ['It offers to God the perfect sacrifice of Christ Himself', 'It is the longest prayer', 'It happens in a church'], correct: 0, explanation: 'In the Mass, Christ\'s perfect sacrifice is re-presented to the Father.' },

    // JUSTICE - Devotion
    { virtue: 'justice', sub: 'devotion', q: 'Devotion under Justice means:', answers: ['A prompt will to give oneself to the service of God', 'Emotional feelings during prayer', 'Going through the motions'], correct: 0, explanation: 'Devotion is the willing readiness to serve God in all things.' },
    { virtue: 'justice', sub: 'devotion', q: 'True devotion is measured by:', answers: ['The will\'s readiness to serve God, not by feelings', 'How emotional you feel during prayer', 'How often you attend services'], correct: 0, explanation: 'Devotion is an act of the will, not a feeling.' },
    { virtue: 'justice', sub: 'devotion', q: 'St. Francis de Sales taught that devotion:', answers: ['Is possible in every state of life, not just for monks and nuns', 'Is only for religious professionals', 'Requires leaving the world'], correct: 0, explanation: 'Every Christian is called to devotion in their own circumstances.' },

    // JUSTICE - Prayer
    { virtue: 'justice', sub: 'prayer', q: 'Prayer as a sub-virtue of Justice means:', answers: ['Lifting the mind and heart to God — an act of worship we owe Him', 'Asking God for things we want', 'Talking to yourself'], correct: 0, explanation: 'Prayer is an act of justice — we owe God our attention and communion.' },
    { virtue: 'justice', sub: 'prayer', q: 'The Liturgy of the Hours structures prayer around:', answers: ['The hours of the day, sanctifying all time for God', 'Convenience', 'Personal preference'], correct: 0, explanation: 'The Divine Office consecrates every part of the day to God.' },
    { virtue: 'justice', sub: 'prayer', q: 'St. Paul says to "pray without ceasing" meaning:', answers: ['Maintain a constant awareness of God\'s presence in all activities', 'Never stop talking', 'Pray 24 hours literally'], correct: 0, explanation: 'Unceasing prayer means keeping our hearts oriented toward God always.' },

    // JUSTICE - Piety
    { virtue: 'justice', sub: 'piety', q: 'Piety as a sub-virtue of Justice means:', answers: ['Rendering due honor and service to parents and homeland', 'Being overly religious in public', 'Looking holy'], correct: 0, explanation: 'Piety is the honor we owe to those who gave us life and nurture.' },
    { virtue: 'justice', sub: 'piety', q: 'The Fourth Commandment ("Honor your father and mother") is an act of:', answers: ['Piety — rendering due respect to parents', 'Obedience only', 'Fear'], correct: 0, explanation: 'Honoring parents is an act of justice — we owe them for the gift of life.' },
    { virtue: 'justice', sub: 'piety', q: 'Piety extends beyond parents to:', answers: ['Country, teachers, and all who have nurtured us', 'Only blood relatives', 'No one else'], correct: 0, explanation: 'We owe gratitude and honor to all who have contributed to our formation.' },

    // JUSTICE - Patriotism
    { virtue: 'justice', sub: 'patriotism', q: 'Patriotism as a virtue means:', answers: ['Rendering due honor to one\'s country and working for the common good', 'Believing your country is always right', 'Blind nationalism'], correct: 0, explanation: 'True patriotism loves one\'s country while acknowledging its faults and working to correct them.' },
    { virtue: 'justice', sub: 'patriotism', q: 'Catholic patriotism is ordered because:', answers: ['Love of country is subordinate to love of God and universal justice', 'Country comes first always', 'Religion and politics don\'t mix'], correct: 0, explanation: 'God\'s law is higher than any nation\'s law — patriotism must be ordered by justice.' },

    // JUSTICE - Gratitude
    { virtue: 'justice', sub: 'gratitude', q: 'Gratitude is a matter of justice because:', answers: ['We owe acknowledgment and thanks for benefits received', 'It makes us feel good', 'It is socially expected'], correct: 0, explanation: 'Gratitude is a debt of justice — we owe thanks for gifts received.' },
    { virtue: 'justice', sub: 'gratitude', q: 'Jesus healed ten lepers but only one returned to give thanks. This teaches:', answers: ['Gratitude is rare but essential — it completes the gift received', 'Most people are ungrateful', 'Only some healings require thanks'], correct: 0, explanation: 'Gratitude acknowledges the giver and completes the circle of love.' },
    { virtue: 'justice', sub: 'gratitude', q: 'The Eucharist literally means:', answers: ['Thanksgiving — the supreme act of gratitude to God', 'Bread and wine', 'Sunday gathering'], correct: 0, explanation: 'The Mass is our greatest act of thanksgiving to God.' },

    // JUSTICE - Truthfulness
    { virtue: 'justice', sub: 'truthfulness', q: 'Truthfulness is a matter of justice because:', answers: ['Others have a right to truth in communication', 'Lying is illegal', 'Truth is subjective'], correct: 0, explanation: 'We owe others honest communication — truth is a right.' },
    { virtue: 'justice', sub: 'truthfulness', q: 'The Eighth Commandment protects:', answers: ['Truthfulness — "You shall not bear false witness"', 'Private property', 'The Sabbath'], correct: 0, explanation: 'God\'s law demands truthful speech and forbids lying.' },
    { virtue: 'justice', sub: 'truthfulness', q: 'St. Thomas More died for truthfulness because:', answers: ['He refused to swear a false oath, even to save his life', 'He was stubborn', 'He enjoyed conflict'], correct: 0, explanation: 'More chose death over a lie — the ultimate witness to truthfulness.' },

    // JUSTICE - Friendship
    { virtue: 'justice', sub: 'friendship', q: 'Friendship (affability) under Justice means:', answers: ['Treating others with appropriate warmth and consideration', 'Being everyone\'s best friend', 'Never disagreeing'], correct: 0, explanation: 'Affability is the pleasant, considerate treatment we owe to all people.' },
    { virtue: 'justice', sub: 'friendship', q: 'Aristotle and Aquinas taught that true friendship is based on:', answers: ['Shared love of the good — mutual pursuit of virtue', 'Having fun together', 'Useful exchanges'], correct: 0, explanation: 'The highest friendship is grounded in shared love of God and goodness.' },

    // JUSTICE - Liberality
    { virtue: 'justice', sub: 'liberality', q: 'Liberality means:', answers: ['Generous use of wealth and possessions for good purposes', 'Giving everything away recklessly', 'Being politically liberal'], correct: 0, explanation: 'Liberality is ordered generosity — using goods well for others\' benefit.' },
    { virtue: 'justice', sub: 'liberality', q: 'The widow\'s mite demonstrates liberality because:', answers: ['She gave from her poverty, not her excess — true generosity', 'She gave the most money', 'Jesus needed donations'], correct: 0, explanation: 'Liberality is measured by the heart\'s generosity, not the amount.' },

    // JUSTICE - Restitution
    { virtue: 'justice', sub: 'restitution', q: 'Restitution means:', answers: ['Restoring what was unjustly taken or damaged', 'Apologizing without action', 'Forgetting the past'], correct: 0, explanation: 'Justice demands that wrongs be made right through concrete restoration.' },
    { virtue: 'justice', sub: 'restitution', q: 'Zacchaeus showed restitution by:', answers: ['Paying back fourfold what he had stolen', 'Simply saying sorry', 'Leaving town'], correct: 0, explanation: 'True repentance includes making amends for the harm done.' },

    // JUSTICE - Distributive Justice
    { virtue: 'justice', sub: 'distributiveJustice', q: 'Distributive Justice governs:', answers: ['How the community allocates goods and burdens fairly', 'Private business deals', 'Individual charity'], correct: 0, explanation: 'Distributive justice ensures fair allocation according to need and merit.' },
    { virtue: 'justice', sub: 'distributiveJustice', q: 'The principle of subsidiarity supports Distributive Justice by:', answers: ['Decisions should be made at the lowest competent level', 'The government should control everything', 'Everyone should fend for themselves'], correct: 0, explanation: 'Subsidiarity respects human dignity by keeping decisions close to those affected.' },

    // JUSTICE - Commutative Justice
    { virtue: 'justice', sub: 'commutativeJustice', q: 'Commutative Justice governs:', answers: ['Fair exchanges between individuals — contracts, wages, trades', 'Government policies', 'Church law'], correct: 0, explanation: 'Commutative justice ensures fairness in person-to-person transactions.' },
    { virtue: 'justice', sub: 'commutativeJustice', q: 'Paying a fair wage is an act of:', answers: ['Commutative Justice — the worker deserves fair compensation', 'Charity', 'Optional generosity'], correct: 0, explanation: 'A just wage is owed in justice, not merely as an act of kindness.' },

    // JUSTICE - Epieikeia
    { virtue: 'justice', sub: 'epieikeia', q: 'Epieikeia (equity) means:', answers: ['Applying the spirit of the law when the letter leads to injustice', 'Breaking rules whenever convenient', 'Following rules blindly'], correct: 0, explanation: 'Epieikeia is the wisdom to know when rigid application of law would defeat justice.' },
    { virtue: 'justice', sub: 'epieikeia', q: 'Jesus showed Epieikeia when He:', answers: ['Healed on the Sabbath — the spirit of the law trumped the letter', 'Broke every law', 'Always followed rules exactly'], correct: 0, explanation: 'Jesus showed that the law exists to serve human good, not vice versa.' },

    // FORTITUDE - Endurance
    { virtue: 'fortitude', sub: 'endurance', q: 'Endurance means:', answers: ['Steadfastly bearing long-term difficulty for a good cause', 'Never feeling pain', 'Physical toughness only'], correct: 0, explanation: 'Endurance is the spiritual strength to persist through prolonged trials.' },
    { virtue: 'fortitude', sub: 'endurance', q: 'Job is a model of endurance because:', answers: ['He maintained faith through extreme suffering without cursing God', 'He never suffered', 'He fought back against God'], correct: 0, explanation: 'Job endured devastating loss while clinging to trust in God.' },
    { virtue: 'fortitude', sub: 'endurance', q: 'St. Paul wrote "suffering produces endurance" (Romans 5:3) meaning:', answers: ['Trials strengthen our capacity to persevere', 'Suffering is pointless', 'We should seek suffering'], correct: 0, explanation: 'Each trial we endure builds our strength for the next.' },

    // FORTITUDE - Patience
    { virtue: 'fortitude', sub: 'patience', q: 'Patience under Fortitude means:', answers: ['Bearing difficulties calmly without losing peace, trusting God\'s timing', 'Passive waiting', 'Suppressing all emotions'], correct: 0, explanation: 'Patience is active trust in God\'s timing while maintaining interior peace.' },
    { virtue: 'fortitude', sub: 'patience', q: 'St. Monica practiced patience by:', answers: ['Praying for Augustine\'s conversion for over 17 years', 'Giving up after a few months', 'Forcing her son to convert'], correct: 0, explanation: 'Monica\'s decades of patient prayer were finally answered.' },
    { virtue: 'fortitude', sub: 'patience', q: 'Christ showed patience during His Passion by:', answers: ['Enduring mockery and suffering without retaliation', 'Fighting back against His captors', 'Never experiencing suffering'], correct: 0, explanation: 'Christ\'s patience in suffering is the model for all Christians.' },

    // FORTITUDE - Magnanimity
    { virtue: 'fortitude', sub: 'magnanimity', q: 'Magnanimity means:', answers: ['Striving for great deeds worthy of great honor, in service to God', 'Boasting about achievements', 'Being satisfied with mediocrity'], correct: 0, explanation: 'The magnanimous person aims high — great deeds for God\'s glory.' },
    { virtue: 'fortitude', sub: 'magnanimity', q: 'St. Ignatius\' motto "Ad Majorem Dei Gloriam" reflects magnanimity because:', answers: ['It calls us to do everything for the greater glory of God', 'It is a nice Latin phrase', 'It means being modest'], correct: 0, explanation: 'Magnanimity pursues greatness — but always for God\'s glory, never our own.' },
    { virtue: 'fortitude', sub: 'magnanimity', q: 'Magnanimity differs from pride because:', answers: ['Magnanimity seeks greatness for God; pride seeks greatness for self', 'They are the same', 'Magnanimity is just a bigger ego'], correct: 0, explanation: 'The magnanimous person is great-souled, orienting greatness toward God.' },

    // FORTITUDE - Confidence
    { virtue: 'fortitude', sub: 'confidence', q: 'Confidence under Fortitude means:', answers: ['Trust in God\'s aid when facing danger or difficulty', 'Self-reliance without God', 'Never feeling afraid'], correct: 0, explanation: 'Christian confidence rests on God\'s strength, not our own.' },
    { virtue: 'fortitude', sub: 'confidence', q: 'David faced Goliath with confidence because:', answers: ['He trusted God would deliver him, not his own strength', 'He was physically stronger', 'He had better weapons'], correct: 0, explanation: 'David\'s confidence was in the Lord of hosts, not in himself.' },

    // FORTITUDE - Perseverance
    { virtue: 'fortitude', sub: 'perseverance', q: 'Perseverance means:', answers: ['Remaining constant in pursuing good despite obstacles over time', 'Stubbornly refusing to change', 'Doing the same thing expecting different results'], correct: 0, explanation: 'Perseverance is faithful constancy in the pursuit of virtue.' },
    { virtue: 'fortitude', sub: 'perseverance', q: '"Let us not grow weary of doing good" (Galatians 6:9) teaches:', answers: ['Perseverance — keep doing good because the harvest will come', 'Give up when tired', 'Good deeds are exhausting'], correct: 0, explanation: 'God promises fruit to those who persevere in doing good.' },

    // FORTITUDE - Daring
    { virtue: 'fortitude', sub: 'daring', q: 'Daring (audacity) under Fortitude means:', answers: ['Overcoming fear to pursue a difficult good when the cause is just', 'Being reckless', 'Never calculating risk'], correct: 0, explanation: 'Daring is fear conquered by love of the good.' },
    { virtue: 'fortitude', sub: 'daring', q: 'The apostles showed daring after Pentecost by:', answers: ['Preaching boldly despite threats of death', 'Hiding in the upper room', 'Only preaching to safe audiences'], correct: 0, explanation: 'The Holy Spirit transformed fearful men into daring witnesses.' },
    { virtue: 'fortitude', sub: 'daring', q: 'St. Joan of Arc showed daring by:', answers: ['Leading an army as a peasant girl, trusting God\'s call', 'Waiting for someone braver', 'Running from battle'], correct: 0, explanation: 'Joan dared greatly because she trusted God\'s mission for her.' },

    // TEMPERANCE - Abstinence
    { virtue: 'temperance', sub: 'abstinence', q: 'Abstinence as a virtue means:', answers: ['Moderating the desire for food and drink according to reason', 'Never eating', 'Extreme dieting'], correct: 0, explanation: 'Abstinence governs our appetites so we eat to live, not live to eat.' },
    { virtue: 'temperance', sub: 'abstinence', q: 'Fasting on Ash Wednesday and Good Friday practices:', answers: ['Abstinence — training the will to master bodily appetites', 'Punishment', 'Weight loss'], correct: 0, explanation: 'Fasting disciplines our desires and turns our hearts to God.' },

    // TEMPERANCE - Sobriety
    { virtue: 'temperance', sub: 'sobriety', q: 'Sobriety means:', answers: ['Moderation in drink, maintaining clarity of mind', 'Never drinking anything', 'Only drinking water'], correct: 0, explanation: 'Sobriety preserves the mind\'s clarity for right judgment and prayer.' },
    { virtue: 'temperance', sub: 'sobriety', q: 'St. Paul warned against drunkenness because:', answers: ['It clouds the mind and makes us unable to follow the Spirit', 'Wine is sinful', 'It is always wrong to drink'], correct: 0, explanation: 'Paul contrasts being filled with wine vs. being filled with the Spirit (Ephesians 5:18).' },

    // TEMPERANCE - Chastity
    { virtue: 'temperance', sub: 'chastity', q: 'Chastity means:', answers: ['Rightly ordering sexual desire according to one\'s state in life', 'Rejecting the body as evil', 'Never having any desires'], correct: 0, explanation: 'Chastity integrates sexuality within the whole person — body and soul.' },
    { virtue: 'temperance', sub: 'chastity', q: 'Chastity applies to:', answers: ['Everyone — married, single, and religious, each in their own way', 'Only religious brothers and sisters', 'Only unmarried people'], correct: 0, explanation: 'Every state of life has its own form of chastity.' },

    // TEMPERANCE - Continence
    { virtue: 'temperance', sub: 'continence', q: 'Continence means:', answers: ['The will\'s resistance to strong disordered desires', 'Complete lack of desire', 'Physical restraint only'], correct: 0, explanation: 'Continence is the will\'s strength to resist powerful temptations.' },
    { virtue: 'temperance', sub: 'continence', q: 'Continence differs from temperance proper because:', answers: ['Temperance moderates desire; continence resists it when it is disordered', 'They are the same', 'Continence is easier'], correct: 0, explanation: 'The continent person still feels the pull but resists; the temperate person has ordered desires.' },

    // TEMPERANCE - Humility
    { virtue: 'temperance', sub: 'humility', q: 'Humility means:', answers: ['Honest self-knowledge — recognizing our dependence on God', 'Thinking you are worthless', 'Never accepting praise'], correct: 0, explanation: 'Humility is truth about ourselves before God.' },
    { virtue: 'temperance', sub: 'humility', q: 'Jesus washed the disciples\' feet to teach:', answers: ['Humility — the greatest must serve', 'That feet need washing', 'That leaders should be obeyed'], correct: 0, explanation: 'The King of Kings knelt to serve — the supreme act of humility.' },
    { virtue: 'temperance', sub: 'humility', q: 'Mary\'s Magnificat is a hymn of humility because:', answers: ['She gives all glory to God and calls herself His lowly handmaid', 'She boasts about being chosen', 'She takes credit for God\'s work'], correct: 0, explanation: 'Mary recognizes that everything comes from God, not from herself.' },

    // TEMPERANCE - Meekness
    { virtue: 'temperance', sub: 'meekness', q: 'Meekness means:', answers: ['Governing anger by reason — strength under control', 'Being weak and passive', 'Never getting angry'], correct: 0, explanation: 'Meekness is not weakness — it is controlled strength, anger governed by reason.' },
    { virtue: 'temperance', sub: 'meekness', q: 'Jesus said "Blessed are the meek" meaning:', answers: ['Those who control their power with gentleness will inherit the earth', 'Weak people are blessed', 'Never stand up for anything'], correct: 0, explanation: 'The meek person has great strength but wields it with gentleness.' },
    { virtue: 'temperance', sub: 'meekness', q: 'Moses was called the meekest man on earth, yet he:', answers: ['Led a nation, confronted Pharaoh, and received God\'s law', 'Was timid and weak', 'Never showed anger'], correct: 0, explanation: 'Moses was powerful but gentle — true meekness is strength restrained.' },

    // TEMPERANCE - Clemency
    { virtue: 'temperance', sub: 'clemency', q: 'Clemency means:', answers: ['Merciful moderation in imposing punishment', 'Never punishing anyone', 'Being soft on crime'], correct: 0, explanation: 'Clemency tempers justice with mercy — firm but not cruel.' },
    { virtue: 'temperance', sub: 'clemency', q: 'Jesus showed clemency to the woman caught in adultery by:', answers: ['Not condemning her while calling her to change — "Go and sin no more"', 'Ignoring her sin', 'Punishing her severely'], correct: 0, explanation: 'Jesus balanced mercy with truth — clemency, not permissiveness.' },

    // TEMPERANCE - Modesty
    { virtue: 'temperance', sub: 'modesty', q: 'Modesty means:', answers: ['Governing outward behavior to reflect inner dignity', 'Wearing particular clothes', 'Hiding from others'], correct: 0, explanation: 'Modesty orders our external deportment to reflect the soul\'s dignity.' },
    { virtue: 'temperance', sub: 'modesty', q: 'Modesty applies to:', answers: ['Dress, speech, behavior, and how we present ourselves', 'Clothing only', 'Women only'], correct: 0, explanation: 'Modesty governs all aspects of how we present ourselves to the world.' }
  ];

  // ===== MORAL CHOICES (for attack turns - tiered rewards) =====
  const MORAL_CHOICES = [
    { scenario: 'Your ship has the advantage over a retreating enemy. Do you...',
      lesserGood: 'Pursue aggressively to ensure the kill',
      greaterGood: 'Engage firmly but with restraint, avoiding unnecessary destruction',
      virtue: 'justice', sub: 'clemency',
      explanation: 'Justice tempered with clemency reflects the full picture of virtue.' },
    { scenario: 'An allied ship is damaged in your sector. You can attack or help. Do you...',
      lesserGood: 'Focus on the enemy — others can help the ally later',
      greaterGood: 'Cover the ally\'s retreat first, then engage the enemy',
      virtue: 'justice', sub: 'friendship',
      explanation: 'True friendship means prioritizing others\' wellbeing, even at cost to yourself.' },
    { scenario: 'You spot a weakness in the enemy formation. Do you...',
      lesserGood: 'Attack immediately before the opportunity passes',
      greaterGood: 'Assess the situation carefully first, then strike with precision',
      virtue: 'prudence', sub: 'circumspection',
      explanation: 'Circumspection — considering all circumstances — makes the strike more effective.' },
    { scenario: 'Your ship is outnumbered. Do you...',
      lesserGood: 'Fight recklessly, hoping for the best',
      greaterGood: 'Fight strategically, conserving strength while defending your position',
      virtue: 'prudence', sub: 'reason',
      explanation: 'Practical reason guides us to fight wisely, not wastefully.' },
    { scenario: 'You could end the battle quickly with a risky all-out attack. Do you...',
      lesserGood: 'Go all-out — glory favors the bold',
      greaterGood: 'Choose a measured approach that protects your crew and allies',
      virtue: 'prudence', sub: 'caution',
      explanation: 'Caution is not cowardice — it protects lives while still achieving the objective.' },
    { scenario: 'An enemy ship is crippled and helpless. Do you...',
      lesserGood: 'Destroy it immediately to remove the threat',
      greaterGood: 'Disable it fully but spare unnecessary destruction',
      virtue: 'temperance', sub: 'clemency',
      explanation: 'Clemency shows mercy even to enemies when the threat is contained.' },
    { scenario: 'Your weapons are charged to maximum. The temptation is to unleash everything. Do you...',
      lesserGood: 'Fire everything for maximum destruction',
      greaterGood: 'Use only what\'s needed, saving reserves for future threats',
      virtue: 'temperance', sub: 'abstinence',
      explanation: 'Abstinence from excess — even in battle — preserves resources for when they\'re truly needed.' },
    { scenario: 'You\'ve been fighting for hours and fatigue is setting in. Do you...',
      lesserGood: 'Push through regardless — rest is for the weak',
      greaterGood: 'Acknowledge your limits and fight smart within them',
      virtue: 'temperance', sub: 'humility',
      explanation: 'Humility recognizes our limits — fighting beyond them puts everyone at risk.' },
    { scenario: 'A fellow captain made a mistake that put you in danger. In the heat of battle, do you...',
      lesserGood: 'Angrily criticize them over comms',
      greaterGood: 'Stay focused on the mission and address it calmly afterward',
      virtue: 'temperance', sub: 'meekness',
      explanation: 'Meekness governs anger — the mission matters more than venting frustration.' },
    { scenario: 'You remember a past battle where you used a similar tactic successfully. Do you...',
      lesserGood: 'Assume it will work the same way again',
      greaterGood: 'Adapt the tactic to current circumstances while drawing on that experience',
      virtue: 'prudence', sub: 'memory',
      explanation: 'Prudent memory applies past lessons to present situations without assuming identical circumstances.' },
    { scenario: 'Your fleet commander suggests a risky maneuver. Do you...',
      lesserGood: 'Ignore the suggestion and do your own thing',
      greaterGood: 'Listen carefully, ask questions, and then execute or respectfully propose an alternative',
      virtue: 'prudence', sub: 'docility',
      explanation: 'Docility — willingness to be taught — makes us better soldiers and better people.' },
    { scenario: 'You see an opening but it requires quick action. Do you...',
      lesserGood: 'Hesitate and lose the moment',
      greaterGood: 'Trust your training and act decisively',
      virtue: 'prudence', sub: 'shrewdness',
      explanation: 'Shrewdness is the ability to seize the right moment for virtuous action.' },
    { scenario: 'The enemy is advancing on a colony base. Fear rises. Do you...',
      lesserGood: 'Hang back at a safe distance',
      greaterGood: 'Move to intercept despite the danger, trusting in God\'s providence',
      virtue: 'fortitude', sub: 'daring',
      explanation: 'Daring overcomes fear when the cause is just and lives are at stake.' },
    { scenario: 'You\'ve been on patrol for days with no enemy contact. Do you...',
      lesserGood: 'Let your guard down — nothing is happening',
      greaterGood: 'Maintain vigilance and readiness, knowing the enemy may appear at any time',
      virtue: 'fortitude', sub: 'perseverance',
      explanation: 'Perseverance means maintaining faithfulness even in monotony.' },
    { scenario: 'Your ship has taken heavy damage. Retreat is possible. Do you...',
      lesserGood: 'Stay and fight to the death regardless',
      greaterGood: 'Hold your ground as long as needed, then withdraw to fight another day',
      virtue: 'fortitude', sub: 'endurance',
      explanation: 'Endurance is not stubbornness — it\'s bearing difficulty wisely for the mission.' },
    { scenario: 'You\'re waiting for reinforcements that are delayed. Do you...',
      lesserGood: 'Attack immediately out of impatience',
      greaterGood: 'Wait patiently for the right moment while defending your position',
      virtue: 'fortitude', sub: 'patience',
      explanation: 'Patience trusts in God\'s timing and waits for the optimal moment.' },
    { scenario: 'Your mission seems impossible — 12 ships against a fleet. Do you...',
      lesserGood: 'Give in to despair about the odds',
      greaterGood: 'Embrace the challenge as an opportunity for great deeds for God\'s glory',
      virtue: 'fortitude', sub: 'magnanimity',
      explanation: 'Magnanimity strives for great deeds — the greater the challenge, the greater the glory.' },
    { scenario: 'You have intelligence about an enemy weakness but aren\'t sure it\'s accurate. Do you...',
      lesserGood: 'Act on it immediately without verification',
      greaterGood: 'Verify what you can, then act with confident trust in God',
      virtue: 'fortitude', sub: 'confidence',
      explanation: 'Confidence combines prudent assessment with trust in God\'s aid.' },
    { scenario: 'You owe a debt of gratitude to an allied ship that saved you earlier. Now they need help. Do you...',
      lesserGood: 'Help reluctantly since you have to',
      greaterGood: 'Gladly rush to their aid, grateful for the chance to repay their kindness',
      virtue: 'justice', sub: 'gratitude',
      explanation: 'Gratitude acknowledges debts of kindness and gladly repays them.' },
    { scenario: 'You discovered your previous attack damaged a neutral station. Do you...',
      lesserGood: 'Ignore it — it was accidental',
      greaterGood: 'Report the damage and do what you can to help repair it',
      virtue: 'justice', sub: 'restitution',
      explanation: 'Restitution demands we make right what we\'ve damaged, even unintentionally.' },
    { scenario: 'Resources are scarce and must be shared among ships. Do you...',
      lesserGood: 'Take more than your share — your ship needs it most',
      greaterGood: 'Distribute fairly according to need, trusting the common good',
      virtue: 'justice', sub: 'distributiveJustice',
      explanation: 'Distributive justice allocates goods fairly for the common good.' },
    { scenario: 'A new crew member reports disturbing information about another captain. Do you...',
      lesserGood: 'Spread the news to others immediately',
      greaterGood: 'Investigate carefully, speak to the captain privately, and seek the truth',
      virtue: 'justice', sub: 'truthfulness',
      explanation: 'Truthfulness demands we verify before speaking and protect reputations.' },
    { scenario: 'You\'re tempted to take a shortcut that bends the rules of engagement. Do you...',
      lesserGood: 'Bend the rules — the ends justify the means',
      greaterGood: 'Follow proper protocols even when it\'s harder',
      virtue: 'justice', sub: 'commutativeJustice',
      explanation: 'Commutative justice respects agreements and rules that bind all parties.' },
    { scenario: 'A strict protocol would prevent you from saving a stranded ally. Do you...',
      lesserGood: 'Follow the letter of the law and leave the ally',
      greaterGood: 'Apply the spirit of the law — save the ally while respecting the protocol\'s intent',
      virtue: 'justice', sub: 'epieikeia',
      explanation: 'Epieikeia is knowing when the spirit of the law matters more than the letter.' },
    { scenario: 'You\'ve won a decisive victory. How do you respond?',
      lesserGood: 'Celebrate your own skill and prowess',
      greaterGood: 'Give thanks to God and honor the contributions of every crew member',
      virtue: 'temperance', sub: 'modesty',
      explanation: 'Modesty in victory gives credit where it\'s due and avoids vanity.' },
    { scenario: 'Your ship is the most powerful in the fleet. Do you...',
      lesserGood: 'Take the lead on every mission to show your strength',
      greaterGood: 'Use your strength to protect weaker ships and support the fleet\'s mission',
      virtue: 'temperance', sub: 'continence',
      explanation: 'Continence resists the desire for glory and channels strength toward service.' },
    { scenario: 'The enemy taunts you, trying to provoke a reckless response. Do you...',
      lesserGood: 'Rise to the bait and charge in angrily',
      greaterGood: 'Keep your composure and respond with disciplined action',
      virtue: 'temperance', sub: 'sobriety',
      explanation: 'Sobriety of mind keeps us clear-headed and in control, even under provocation.' },
    { scenario: 'You need to render worship to God before a critical battle. Do you...',
      lesserGood: 'Skip prayer — the battle is more urgent',
      greaterGood: 'Take time for prayer, trusting that God\'s grace is more important than extra preparation',
      virtue: 'justice', sub: 'religion',
      explanation: 'Religion gives God the worship that is His due — even when other things press.' },
    { scenario: 'Your ship is assigned a humble patrol mission while others go on a glorious assault. Do you...',
      lesserGood: 'Complain about the assignment',
      greaterGood: 'Accept your duty faithfully, knowing every role serves the mission',
      virtue: 'justice', sub: 'devotion',
      explanation: 'Devotion is the prompt will to serve, regardless of the glamour of the task.' },
    { scenario: 'You see ships from your home sector in danger. Your loyalty runs deep. Do you...',
      lesserGood: 'Rush to help only your people, ignoring others in need',
      greaterGood: 'Help based on greatest need, honoring your homeland while serving all',
      virtue: 'justice', sub: 'patriotism',
      explanation: 'True patriotism loves one\'s own while serving the universal good.' },
    { scenario: 'After the battle, your ship needs to be clean and operational for inspection. Do you...',
      lesserGood: 'Do the minimum — you\'re tired from fighting',
      greaterGood: 'Maintain your ship with care, respecting your duty to the fleet',
      virtue: 'justice', sub: 'piety',
      explanation: 'Piety extends to all who have authority over us — including our duties to our station.' },
    { scenario: 'An ally\'s ship has a system you admire. Do you...',
      lesserGood: 'Covet it and try to get a transfer',
      greaterGood: 'Be grateful for your own ship\'s strengths and work to improve them',
      virtue: 'temperance', sub: 'chastity',
      explanation: 'Chastity, broadly understood, means rightly ordering our desires — being content with what we have.' },
    { scenario: 'You predict the enemy\'s next move based on their patterns. Do you...',
      lesserGood: 'Act on your prediction alone without telling anyone',
      greaterGood: 'Share your insight with the fleet so everyone can prepare',
      virtue: 'justice', sub: 'liberality',
      explanation: 'Liberality means sharing what we have generously — including knowledge and insight.' },
    { scenario: 'Your ship and another both need the same supply depot. Do you...',
      lesserGood: 'Race to get there first',
      greaterGood: 'Communicate and coordinate so both ships get what they need',
      virtue: 'prudence', sub: 'foresight',
      explanation: 'Foresight anticipates needs and coordinates solutions before conflict arises.' },
    { scenario: 'You\'ve just received a direct order you think is unwise. Do you...',
      lesserGood: 'Disobey outright based on your own judgment',
      greaterGood: 'Execute the order while respectfully communicating your concerns through proper channels',
      virtue: 'prudence', sub: 'understanding',
      explanation: 'Understanding grasps both the order\'s intent and the proper way to address concerns.' }
  ];

  return {
    CARDINAL_VIRTUES,
    THEOLOGICAL_VIRTUES,
    GIFTS_OF_SPIRIT,
    FRUITS_OF_SPIRIT,
    SUNDAY_REFLECTIONS,
    VIRTUE_QUESTIONS,
    MORAL_CHOICES
  };
})();
