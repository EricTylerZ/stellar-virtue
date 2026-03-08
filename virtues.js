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
    { virtue: 'temperance', sub: 'modesty', q: 'Modesty applies to:', answers: ['Dress, speech, behavior, and how we present ourselves', 'Clothing only', 'Women only'], correct: 0, explanation: 'Modesty governs all aspects of how we present ourselves to the world.' },

    // ===== LEVEL 2 — Intermediate Cardinal Virtue Questions =====

    // Prudence Level 2
    { virtue: 'prudence', sub: 'memory', level: 2, q: 'St. Thomas teaches that prudent memory requires not just recall but:', answers: ['Fidelity to reality — remembering things as they truly happened, not as we wished', 'A photographic memory', 'Remembering only good things'], correct: 0, explanation: 'Prudent memory demands truthful recollection — self-deception about the past undermines all future judgment.' },
    { virtue: 'prudence', sub: 'understanding', level: 2, q: 'Prudential understanding differs from speculative understanding because:', answers: ['It grasps practical truths ordered to action, not abstract truth for its own sake', 'Speculative is higher than practical', 'There is no real difference'], correct: 0, explanation: 'Prudential understanding is ordered to doing — it asks "what should I do?" not "what is true in the abstract?"' },
    { virtue: 'prudence', sub: 'docility', level: 2, q: 'Docility can be opposed by which vice?', answers: ['Presumption — assuming we already know enough and need no counsel', 'Timidity', 'Excessive study'], correct: 0, explanation: 'The presumptuous person refuses to learn from others, closing off a vital source of prudential wisdom.' },
    { virtue: 'prudence', sub: 'foresight', level: 2, q: 'Foresight is considered the principal part of prudence because:', answers: ['The very name "prudence" (providentia) derives from foresight — ordering present means to future ends', 'It is the easiest sub-virtue', 'All the other sub-virtues depend on it mechanically'], correct: 0, explanation: 'Prudence essentially means "seeing ahead" — foresight is its core act: ordering present actions toward a good end.' },
    { virtue: 'prudence', sub: 'caution', level: 2, q: 'How does the vice of negligence relate to caution?', answers: ['Negligence is the failure to exercise caution — not taking care to avoid foreseeable evils', 'Negligence is just laziness, unrelated to caution', 'Caution causes negligence by overthinking'], correct: 0, explanation: 'Negligence is the direct opposite of caution — it fails to attend to the dangers that prudence should foresee.' },

    // Justice Level 2
    { virtue: 'justice', sub: 'religion', level: 2, q: 'Why can we never fully render to God what Religion demands?', answers: ['Because the debt we owe God is infinite — no creature can fully repay the Creator', 'We actually can if we try hard enough', 'God does not really want our worship'], correct: 0, explanation: 'The virtue of Religion acknowledges an unpayable debt — our worship is always insufficient, which should inspire greater devotion.' },
    { virtue: 'justice', sub: 'truthfulness', level: 2, q: 'The "mental reservation" tradition in moral theology relates to truthfulness by:', answers: ['Distinguishing between lying (always wrong) and withholding truth from those who have no right to it', 'Permitting all forms of deception', 'Being identical to lying'], correct: 0, explanation: 'Truthfulness does not require disclosing everything to everyone — some information may be rightly withheld.' },
    { virtue: 'justice', sub: 'epieikeia', level: 2, q: 'Why did Aristotle consider epieikeia superior to legal justice?', answers: ['Because it corrects the law when rigid application would produce injustice — it fulfills the lawgiver\'s true intent', 'Because laws are always wrong', 'He did not — he considered them equal'], correct: 0, explanation: 'Epieikeia is a higher justice — it reaches the lawgiver\'s intention when the letter of the law falls short.' },

    // Fortitude Level 2
    { virtue: 'fortitude', sub: 'magnanimity', level: 2, q: 'The magnanimous person handles honor and dishonor by:', answers: ['Accepting honor with gratitude but not depending on it, and enduring dishonor without losing purpose', 'Seeking honor constantly', 'Rejecting all honor as pride'], correct: 0, explanation: 'Magnanimity has a right relationship with honor — grateful for it, undisturbed without it.' },
    { virtue: 'fortitude', sub: 'patience', level: 2, q: 'St. Thomas teaches that patience is more closely related to fortitude than to temperance because:', answers: ['It involves enduring evils (a fortitude act) rather than moderating desires (a temperance act)', 'It requires physical toughness', 'They are actually the same virtue'], correct: 0, explanation: 'Patience endures difficult evils without being broken — this is the heart of fortitude: sustaining good under pressure.' },
    { virtue: 'fortitude', sub: 'endurance', level: 2, q: 'Why does St. Thomas teach that endurance (sustinere) is a greater act than attack (aggredi)?', answers: ['Because enduring is harder — it requires facing a present evil over time, while attacking allows us to choose the moment', 'Attacking is actually harder', 'They are equally difficult'], correct: 0, explanation: 'The one who endures faces evil at the evil\'s chosen time, not their own — this sustained courage is the harder act.' },

    // Temperance Level 2
    { virtue: 'temperance', sub: 'humility', level: 2, q: 'St. Thomas places humility under temperance rather than justice because:', answers: ['Humility moderates the desire for our own excellence — it restrains an interior appetite', 'It renders what we owe to others', 'It requires courage'], correct: 0, explanation: 'Humility tempers the disordered desire for self-exaltation — it is about moderating an internal passion.' },
    { virtue: 'temperance', sub: 'meekness', level: 2, q: 'Meekness does not mean never being angry because:', answers: ['Righteous anger at genuine evil is appropriate — meekness governs anger, not eliminates it', 'Meekness means total passivity', 'Anger is always sinful'], correct: 0, explanation: 'Jesus showed righteous anger at the money-changers. Meekness means anger is governed by reason, not absent.' },

    // ===== LEVEL 3 — Advanced Cardinal Virtue Questions =====

    // Prudence Level 3
    { virtue: 'prudence', sub: 'reason', level: 3, q: 'St. Thomas identifies three acts of prudence: counsel, judgment, and command. The most important is:', answers: ['Command (imperium) — because prudence must result in action, not merely deliberation', 'Counsel — because deliberation is the hardest part', 'Judgment — because right judgment is the essence of prudence'], correct: 0, explanation: 'Many deliberate well and judge correctly but fail to act. Command — the decisive "do this now" — is prudence\'s crowning act.' },
    { virtue: 'prudence', sub: 'circumspection', level: 3, q: 'How do prudence\'s sub-virtues work together in a single moral act?', answers: ['Memory recalls experience, understanding grasps the situation, docility seeks counsel, reason deliberates, foresight projects consequences, circumspection weighs circumstances, caution avoids pitfalls, and shrewdness seizes the moment', 'Each sub-virtue works independently on different acts', 'Only one sub-virtue is used per decision'], correct: 0, explanation: 'A single prudent act engages all integral parts — each contributes a necessary element to the complete act of right reason.' },

    // Justice Level 3
    { virtue: 'justice', sub: 'religion', level: 3, q: 'The relationship between the virtue of Religion and the Gift of Piety is:', answers: ['Religion renders God what we owe in justice; Piety transforms this duty into filial love — the gift perfects the virtue', 'They are the same thing', 'Piety replaces Religion once received'], correct: 0, explanation: 'Religion is duty; Piety is love. The Gift of Piety elevates religious observance from obligation to intimate, joyful communion.' },
    { virtue: 'justice', sub: 'distributiveJustice', level: 3, q: 'Catholic social teaching distinguishes distributive justice from commutative justice and legal justice. Their relationships are:', answers: ['Legal justice orders persons to the common good; distributive justice allocates the common good to persons; commutative justice governs person-to-person exchanges — all three are needed', 'They are three names for the same concept', 'Only commutative justice matters in practice'], correct: 0, explanation: 'The three forms of justice are complementary — together they order all relationships: person-to-community, community-to-person, and person-to-person.' },

    // Fortitude Level 3
    { virtue: 'fortitude', sub: 'daring', level: 3, q: 'The relationship between fortitude\'s endurance and daring follows this principle:', answers: ['Endurance is the primary act (sustaining good under evil) while daring is secondary (attacking obstacles) — both are needed but endurance is more essential', 'Daring is always primary because offense is the best defense', 'They must be used in equal measure'], correct: 0, explanation: 'St. Thomas teaches that endurance is the more characteristic act of fortitude, because it is harder to stand firm under evil than to advance against it.' },

    // Temperance Level 3
    { virtue: 'temperance', sub: 'humility', level: 3, q: 'St. Thomas teaches that humility is the foundation of the spiritual life because:', answers: ['It removes the obstacle of pride, which is the root of all sin, thereby disposing the soul to receive grace and all other virtues', 'It is the easiest virtue to practice', 'It is more important than charity'], correct: 0, explanation: 'Humility does not replace charity (which is the queen of virtues) but is the foundation — without it, pride blocks grace and all growth in virtue.' }
  ];

  // ===== GIFT OF THE HOLY SPIRIT QUESTIONS =====
  const GIFT_QUESTIONS = [
    // Wisdom
    { category: 'gift', topic: 'wisdom', q: 'The Gift of Wisdom allows us to:', answers: ['Judge all things in light of divine truth and taste the sweetness of God', 'Be smarter than other people', 'Know the future'], correct: 0, explanation: 'Wisdom is the highest gift — it lets us see and savor reality as God sees it.' },
    { category: 'gift', topic: 'wisdom', q: 'Wisdom perfects which theological virtue?', answers: ['Charity — it deepens our love by letting us experience divine things', 'Faith', 'Hope'], correct: 0, explanation: 'Wisdom perfects Charity by giving us a connnatural knowledge of God through love.' },
    { category: 'gift', topic: 'wisdom', q: 'Solomon asked God for wisdom rather than riches because:', answers: ['Wisdom orders all other goods — without it, nothing else serves its purpose', 'He was already rich', 'God forced him to choose'], correct: 0, explanation: 'Solomon understood that wisdom is the foundation for using all other gifts rightly.' },

    // Understanding
    { category: 'gift', topic: 'understanding', q: 'The Gift of Understanding allows us to:', answers: ['Penetrate the deepest meaning of revealed truths', 'Understand every language', 'Comprehend all of science'], correct: 0, explanation: 'Understanding gives a supernatural penetration into the truths of faith.' },
    { category: 'gift', topic: 'understanding', q: 'Understanding perfects which theological virtue?', answers: ['Faith — it deepens our grasp of what we believe', 'Hope', 'Charity'], correct: 0, explanation: 'Understanding illuminates faith from within, helping us grasp what we believe more deeply.' },
    { category: 'gift', topic: 'understanding', q: 'The Gift of Understanding differs from natural intelligence because:', answers: ['It is a supernatural light that reveals the inner meaning of divine truths', 'It makes you smarter overall', 'It replaces the need to study'], correct: 0, explanation: 'This gift goes beyond natural reason — it is the Holy Spirit illuminating the truths of faith.' },

    // Counsel
    { category: 'gift', topic: 'counsel', q: 'The Gift of Counsel helps us to:', answers: ['Know the right course of action in difficult situations through divine guidance', 'Give advice to others', 'Avoid all decisions'], correct: 0, explanation: 'Counsel is the Holy Spirit whispering guidance when human prudence reaches its limits.' },
    { category: 'gift', topic: 'counsel', q: 'Counsel perfects which cardinal virtue?', answers: ['Prudence — it provides supernatural guidance beyond natural reasoning', 'Justice', 'Fortitude'], correct: 0, explanation: 'Counsel elevates Prudence by adding divine light to our practical judgments.' },
    { category: 'gift', topic: 'counsel', q: 'We exercise the Gift of Counsel when:', answers: ['We sense an interior prompting from the Holy Spirit about what to do', 'We follow popular opinion', 'We make lists of pros and cons'], correct: 0, explanation: 'Counsel is experienced as a quiet interior certainty about the right path, beyond what reason alone provides.' },

    // Fortitude (Gift)
    { category: 'gift', topic: 'fortitudeGift', q: 'The Gift of Fortitude differs from the cardinal virtue of Fortitude because:', answers: ['It provides supernatural strength beyond natural human capacity', 'It is the same thing', 'It only applies to physical courage'], correct: 0, explanation: 'The gift elevates natural fortitude to supernatural levels — enabling martyrdom and heroic endurance.' },
    { category: 'gift', topic: 'fortitudeGift', q: 'The Gift of Fortitude perfects which cardinal virtue?', answers: ['Fortitude — it strengthens the soul beyond natural endurance', 'Temperance', 'Prudence'], correct: 0, explanation: 'The gift perfects Fortitude by giving supernatural strength for trials beyond human capacity.' },
    { category: 'gift', topic: 'fortitudeGift', q: 'The martyrs demonstrate the Gift of Fortitude because:', answers: ['They endured suffering beyond any natural human capacity, sustained by the Holy Spirit', 'They were naturally brave people', 'They did not feel pain'], correct: 0, explanation: 'No natural courage alone explains the martyrs\' endurance — only the supernatural Gift of Fortitude.' },

    // Knowledge
    { category: 'gift', topic: 'knowledge', q: 'The Gift of Knowledge allows us to:', answers: ['Understand created things in their relation to God', 'Know everything about science', 'Have a perfect memory'], correct: 0, explanation: 'Knowledge judges created things rightly — seeing them as pointing to God, not as ends in themselves.' },
    { category: 'gift', topic: 'knowledge', q: 'Knowledge perfects which theological virtue?', answers: ['Faith — it helps us see how creation reveals God\'s truth', 'Charity', 'Hope'], correct: 0, explanation: 'Knowledge strengthens faith by showing how all created things point to their Creator.' },
    { category: 'gift', topic: 'knowledge', q: 'The Gift of Knowledge helps us avoid:', answers: ['Treating created goods as ultimate ends rather than means to God', 'Learning new things', 'Enjoying creation'], correct: 0, explanation: 'Knowledge rightly orders our relationship to created things — enjoying them as gifts, not idols.' },

    // Piety
    { category: 'gift', topic: 'piety', q: 'The Gift of Piety gives us:', answers: ['A filial affection toward God as Father and tenderness toward all His children', 'Mere outward religious observance', 'Fear of punishment'], correct: 0, explanation: 'Piety moves us to relate to God not as a distant ruler but as a loving Father.' },
    { category: 'gift', topic: 'piety', q: 'Piety perfects which cardinal virtue?', answers: ['Justice — it elevates our duty to God into loving devotion', 'Temperance', 'Prudence'], correct: 0, explanation: 'Piety transforms the cold duty of justice into warm, filial love for God.' },
    { category: 'gift', topic: 'piety', q: 'St. Paul\'s cry "Abba, Father!" (Romans 8:15) reflects the Gift of Piety because:', answers: ['It shows the Holy Spirit giving us an intimate, childlike relationship with God', 'It is a formal prayer', 'It is a Hebrew greeting'], correct: 0, explanation: 'The Spirit of adoption moves us to cry out to God with the intimacy of a child to a parent.' },

    // Fear of the Lord
    { category: 'gift', topic: 'fearOfLord', q: 'Fear of the Lord means:', answers: ['Filial awe and reverence before God\'s majesty — not servile terror', 'Being terrified of God\'s punishment', 'Avoiding God out of fear'], correct: 0, explanation: 'Fear of the Lord is a child\'s loving reverence, not a slave\'s terror.' },
    { category: 'gift', topic: 'fearOfLord', q: 'Fear of the Lord perfects which cardinal virtue?', answers: ['Temperance — it makes us recoil from offending God', 'Fortitude', 'Justice'], correct: 0, explanation: 'Fear of the Lord moderates our desires by making us dread displeasing the God we love.' },
    { category: 'gift', topic: 'fearOfLord', q: '"The fear of the Lord is the beginning of wisdom" (Proverbs 9:10) because:', answers: ['Reverence for God is the foundation on which all wisdom is built', 'You must be afraid before you can be wise', 'Wisdom causes fear'], correct: 0, explanation: 'Without awe before God, no true wisdom is possible — it grounds everything else.' },

    // ===== LEVEL 2 — Intermediate Gift Questions =====
    { category: 'gift', topic: 'wisdom', level: 2, q: 'St. Thomas distinguishes the Gift of Wisdom from natural wisdom because:', answers: ['The gift judges by connaturality — a kind of sympathetic knowledge through love, not just reason', 'Natural wisdom and the gift are the same thing applied differently', 'The gift is just a higher IQ'], correct: 0, explanation: 'Wisdom as a gift works through affective connaturality — we know divine things because we love them and are united to them.' },
    { category: 'gift', topic: 'understanding', level: 2, q: 'The Gift of Understanding relates to the mysteries of faith by:', answers: ['Giving not comprehension of the mystery itself, but a deeper penetration of what is believed', 'Removing all mystery from faith', 'Making faith unnecessary because we now understand fully'], correct: 0, explanation: 'Understanding does not eliminate mystery — it deepens our grasp of what remains infinitely beyond us.' },
    { category: 'gift', topic: 'counsel', level: 2, q: 'How does the Gift of Counsel relate to discernment of spirits?', answers: ['Counsel enables us to recognize the Holy Spirit\'s promptings versus those from other sources', 'Discernment and counsel are completely separate things', 'Counsel replaces the need for spiritual direction'], correct: 0, explanation: 'The Gift of Counsel helps us distinguish divine inspiration from natural inclination or temptation.' },
    { category: 'gift', topic: 'fortitudeGift', level: 2, q: 'The Gift of Fortitude is especially needed when:', answers: ['Natural courage is insufficient — in persecution, martyrdom, or prolonged spiritual trial', 'Facing everyday inconveniences', 'We want to be physically stronger'], correct: 0, explanation: 'The gift provides supernatural fortitude for situations where natural courage would fail.' },
    { category: 'gift', topic: 'knowledge', level: 2, q: 'The Gift of Knowledge helps us avoid the error of:', answers: ['Treating created goods as ultimate ends — idolatry in its broadest sense', 'Learning too much about science', 'Appreciating beauty in nature'], correct: 0, explanation: 'Knowledge rightly orders creation — everything is good as a sign pointing to God, but none can replace Him.' },
    { category: 'gift', topic: 'piety', level: 2, q: 'The Gift of Piety transforms our prayer because:', answers: ['It moves us from formal obligation to intimate, affectionate conversation with God as Father', 'It makes us pray longer', 'It removes the need for formal prayer'], correct: 0, explanation: 'Piety turns dutiful worship into loving communion — prayer becomes a child\'s conversation with a Father.' },
    { category: 'gift', topic: 'fearOfLord', level: 2, q: 'How does filial fear differ from servile fear?', answers: ['Filial fear dreads offending a beloved Father; servile fear dreads only the punishment', 'There is no meaningful difference', 'Servile fear is better because it is more motivating'], correct: 0, explanation: 'Filial fear flows from love — we fear hurting the One we love. Servile fear only fears consequences.' },

    // ===== LEVEL 3 — Advanced Gift Questions =====
    { category: 'gift', topic: 'wisdom', level: 3, q: 'How do the seven gifts relate to each other in the soul\'s spiritual life, according to St. Thomas?', answers: ['They form an interconnected system: Wisdom is the highest, ordering all others, while Fear of the Lord is the foundation that disposes us to receive the rest', 'Each gift operates independently', 'Only one gift is active at a time'], correct: 0, explanation: 'The gifts form a hierarchy: Fear disposes, then Fortitude/Knowledge/Piety strengthen, then Counsel/Understanding illuminate, and Wisdom crowns all.' },
    { category: 'gift', topic: 'counsel', level: 3, q: 'The relationship between the Gift of Counsel and the infused virtue of Prudence is:', answers: ['Counsel perfects prudence by providing divine light for situations where human deliberation reaches its limit, but does not replace prudence', 'Counsel replaces prudence entirely', 'Prudence is natural; counsel is supernatural, and they never interact'], correct: 0, explanation: 'The gifts perfect the virtues — Counsel does not bypass prudence but elevates it with supernatural guidance.' },
    { category: 'gift', topic: 'knowledge', level: 3, q: 'Ecclesiastes\' statement "vanity of vanities, all is vanity" reflects the Gift of Knowledge because:', answers: ['It judges created things rightly — apart from God, all creatures are insufficient for human happiness', 'It shows pessimism about creation', 'It means created things are evil'], correct: 0, explanation: 'Knowledge does not despise creation but sees its limits — only God can satisfy the human heart.' }
  ];

  // ===== FRUIT OF THE HOLY SPIRIT QUESTIONS =====
  const FRUIT_QUESTIONS = [
    // Charity (Fruit)
    { category: 'fruit', topic: 'charityFruit', q: 'The Fruit of Charity is:', answers: ['Selfless love made visible in action — love that seeks nothing for itself', 'A warm feeling of affection', 'Giving money to the poor'], correct: 0, explanation: 'As a fruit, Charity is the tangible evidence of the Holy Spirit\'s love flowing through us.' },
    { category: 'fruit', topic: 'charityFruit', q: 'The Fruit of Charity differs from the theological virtue of Charity because:', answers: ['The virtue is the habit; the fruit is its mature, visible expression in daily life', 'They are unrelated', 'The fruit is less important'], correct: 0, explanation: 'Fruits are the perfected effects of virtues — Charity as a fruit is love operating with ease and joy.' },

    // Joy
    { category: 'fruit', topic: 'joy', q: 'The Fruit of Joy is:', answers: ['A deep spiritual gladness that persists even in suffering', 'The same as happiness', 'A constant emotional high'], correct: 0, explanation: 'Joy is not circumstantial happiness — it is a supernatural gladness rooted in God\'s presence.' },
    { category: 'fruit', topic: 'joy', q: 'St. Paul could write about joy from prison because:', answers: ['True joy comes from union with God, not from circumstances', 'He was in denial about his situation', 'The prison was comfortable'], correct: 0, explanation: 'Paul\'s joy was rooted in Christ, making it independent of external conditions.' },

    // Peace
    { category: 'fruit', topic: 'peace', q: 'The Fruit of Peace is:', answers: ['Interior tranquility from having one\'s soul rightly ordered toward God', 'The absence of all conflict', 'A relaxed feeling'], correct: 0, explanation: 'Peace is the tranquility of order — when passions are governed by reason and reason by God.' },
    { category: 'fruit', topic: 'peace', q: 'Jesus said "My peace I give to you; not as the world gives" meaning:', answers: ['His peace is an interior order that external chaos cannot destroy', 'Worldly peace is bad', 'Only Christians can have peace'], correct: 0, explanation: 'Christ\'s peace is supernatural — it endures even when external circumstances are turbulent.' },

    // Patience (Fruit)
    { category: 'fruit', topic: 'longanimity', q: 'The Fruit of Patience is:', answers: ['Forbearance in difficulties, bearing trials with equanimity', 'Passive waiting without hope', 'Suppressing frustration'], correct: 0, explanation: 'Patience as a fruit is the mature ability to endure difficulty with supernatural calm.' },
    { category: 'fruit', topic: 'longanimity', q: 'The Fruit of Patience flows from which cardinal virtue?', answers: ['Fortitude — specifically the sub-virtue of patience', 'Temperance', 'Prudence'], correct: 0, explanation: 'When fortitude\'s patience is perfected by the Holy Spirit, the Fruit of Patience appears.' },

    // Kindness
    { category: 'fruit', topic: 'kindness', q: 'The Fruit of Kindness is:', answers: ['Benevolence toward others made concrete in gentle, considerate action', 'Being nice to get something in return', 'Avoiding conflict at all costs'], correct: 0, explanation: 'Kindness as a fruit flows naturally and joyfully — it is effortless generosity of spirit.' },
    { category: 'fruit', topic: 'kindness', q: 'The Fruit of Kindness flows from:', answers: ['Justice, especially the sub-virtue of Friendship (affability)', 'Temperance', 'Fortitude'], correct: 0, explanation: 'When justice\'s friendship is perfected by grace, kindness appears as a mature fruit.' },

    // Goodness
    { category: 'fruit', topic: 'goodness', q: 'The Fruit of Goodness is:', answers: ['Generosity and uprightness of heart — doing good with ease and delight', 'Following rules perfectly', 'Never making mistakes'], correct: 0, explanation: 'Goodness as a fruit means the soul naturally and joyfully tends toward what is right.' },
    { category: 'fruit', topic: 'goodness', q: 'The Fruit of Goodness flows from the mastery of:', answers: ['Justice — when rendering what is due becomes second nature', 'Fortitude', 'Temperance'], correct: 0, explanation: 'A soul fully formed in justice radiates goodness effortlessly.' },

    // Generosity
    { category: 'fruit', topic: 'generosity', q: 'The Fruit of Generosity is:', answers: ['Liberality in giving of oneself — time, talent, and treasure — with joy', 'Giving money reluctantly', 'Being generous only when others are watching'], correct: 0, explanation: 'Generosity as a fruit means giving flows naturally from a heart enlarged by grace.' },
    { category: 'fruit', topic: 'generosity', q: 'The Fruit of Generosity flows from:', answers: ['Justice, specifically the sub-virtue of Liberality', 'Fortitude', 'Prudence'], correct: 0, explanation: 'When liberality is perfected by grace, generosity becomes a spontaneous fruit of the Spirit.' },

    // Gentleness
    { category: 'fruit', topic: 'gentleness', q: 'The Fruit of Gentleness is:', answers: ['Absence of harshness — strength expressed with tenderness and care', 'Weakness and passivity', 'Avoiding all confrontation'], correct: 0, explanation: 'Gentleness is power under the Holy Spirit\'s control — not weakness, but strength made tender.' },
    { category: 'fruit', topic: 'gentleness', q: 'The Fruit of Gentleness flows from:', answers: ['Temperance, specifically the sub-virtue of Meekness', 'Fortitude', 'Justice'], correct: 0, explanation: 'When meekness is perfected by grace, gentleness appears as a mature fruit.' },

    // Faithfulness
    { category: 'fruit', topic: 'faithfulness', q: 'The Fruit of Faithfulness is:', answers: ['Fidelity and constancy — remaining true to God, promises, and one\'s state in life', 'Never changing your mind about anything', 'Following trends faithfully'], correct: 0, explanation: 'Faithfulness as a fruit means constancy flows naturally from a soul rooted in God.' },
    { category: 'fruit', topic: 'faithfulness', q: 'The Fruit of Faithfulness flows from:', answers: ['The theological virtue of Faith, perfected by grace', 'Temperance', 'Fortitude'], correct: 0, explanation: 'When faith is deepened by the Holy Spirit, faithfulness appears as its mature fruit.' },

    // Modesty (Fruit)
    { category: 'fruit', topic: 'modestyFruit', q: 'The Fruit of Modesty is:', answers: ['Propriety and humble demeanor flowing naturally from interior order', 'Following a dress code', 'Hiding from attention'], correct: 0, explanation: 'Modesty as a fruit means the soul\'s interior dignity naturally shows outwardly.' },
    { category: 'fruit', topic: 'modestyFruit', q: 'The Fruit of Modesty flows from:', answers: ['Temperance, specifically the sub-virtue of Modesty', 'Justice', 'Fortitude'], correct: 0, explanation: 'When temperance\'s modesty is perfected by grace, it becomes a visible fruit of the Spirit.' },

    // Self-Control
    { category: 'fruit', topic: 'selfControl', q: 'The Fruit of Self-Control is:', answers: ['Mastery over impulses through reason illuminated by grace, exercised with ease', 'White-knuckle willpower', 'Never having any desires'], correct: 0, explanation: 'Self-control as a fruit means ordering desires becomes natural — not a constant struggle.' },
    { category: 'fruit', topic: 'selfControl', q: 'The Fruit of Self-Control flows from:', answers: ['Temperance, specifically the sub-virtue of Continence', 'Prudence', 'Justice'], correct: 0, explanation: 'When continence is perfected by the Holy Spirit, self-control appears as a mature fruit.' },

    // Chastity (Fruit)
    { category: 'fruit', topic: 'chastityFruit', q: 'The Fruit of Chastity is:', answers: ['Purity of heart and body flowing from a soul rightly ordered by grace', 'Rejecting the body as evil', 'An impossible ideal'], correct: 0, explanation: 'Chastity as a fruit means purity flows naturally from a heart transformed by the Holy Spirit.' },
    { category: 'fruit', topic: 'chastityFruit', q: 'The Fruit of Chastity flows from:', answers: ['Temperance, specifically the sub-virtue of Chastity', 'Justice', 'Fortitude'], correct: 0, explanation: 'When temperance\'s chastity is perfected by grace, it becomes a beautiful fruit of the Spirit.' },

    // ===== LEVEL 2 — Intermediate Fruit Questions =====
    { category: 'fruit', topic: 'charityFruit', level: 2, q: 'How does the Fruit of Charity differ from mere philanthropy?', answers: ['Charity flows from the Holy Spirit and loves others for God\'s sake, not just human compassion', 'There is no real difference', 'Philanthropy is actually better because it is more practical'], correct: 0, explanation: 'The fruit of Charity is supernatural — it loves with God\'s own love, not just natural sympathy.' },
    { category: 'fruit', topic: 'joy', level: 2, q: 'A saint experiencing great suffering yet radiating joy demonstrates:', answers: ['That joy is independent of circumstances because it flows from union with God', 'That they are suppressing their real feelings', 'That suffering is not real for holy people'], correct: 0, explanation: 'Supernatural joy coexists with natural sorrow because its source is God, not circumstances.' },
    { category: 'fruit', topic: 'peace', level: 2, q: 'St. Augustine defined peace as "the tranquility of order." This means:', answers: ['Peace comes when everything in the soul is rightly ordered — passions under reason, reason under God', 'Peace means everything is calm and nothing is happening', 'Peace is the absence of enemies'], correct: 0, explanation: 'Interior peace requires right ordering of the whole person — not just quiet surroundings.' },
    { category: 'fruit', topic: 'longanimity', level: 2, q: 'How does the Fruit of Patience relate to redemptive suffering?', answers: ['Patient endurance of suffering, united to Christ\'s cross, has redemptive value for others', 'Patience means suffering has no purpose but we endure it anyway', 'Only Christ\'s suffering is redemptive, ours never is'], correct: 0, explanation: 'St. Paul says we "fill up what is lacking in Christ\'s afflictions" (Col 1:24) — patient suffering is co-redemptive.' },
    { category: 'fruit', topic: 'kindness', level: 2, q: 'Kindness as a mature fruit differs from people-pleasing because:', answers: ['True kindness serves the other\'s real good, even when it requires difficult honesty', 'They are essentially the same thing', 'Kindness never involves saying anything hard'], correct: 0, explanation: 'The fruit of kindness is ordered by truth — it seeks genuine good, not merely approval.' },
    { category: 'fruit', topic: 'selfControl', level: 2, q: 'Why does St. Thomas teach that the truly temperate person differs from the merely continent person?', answers: ['The temperate person\'s desires are rightly ordered; the continent person still struggles against disordered desires', 'There is no real difference', 'The continent person is more virtuous because they fight harder'], correct: 0, explanation: 'Self-control as a fruit means the struggle lessens — desires become ordered, not just resisted.' },

    // ===== LEVEL 3 — Advanced Fruit Questions =====
    { category: 'fruit', topic: 'charityFruit', level: 3, q: 'St. Thomas Aquinas teaches that the fruits of the Holy Spirit are related to the beatitudes in that:', answers: ['The fruits are delightful acts that flow from perfected virtues, while the beatitudes are the heroic acts of perfect virtue — fruits support and manifest the beatitudes', 'They are completely unrelated concepts', 'The beatitudes replace the fruits'], correct: 0, explanation: 'Fruits are the sweet effects of virtues operating well; beatitudes are the heroic summit. Both flow from the same perfected virtues.' },
    { category: 'fruit', topic: 'peace', level: 3, q: 'The relationship between the Fruit of Peace and the Gift of Wisdom is:', answers: ['Wisdom orders all things in light of God, producing the tranquility of right order that is Peace', 'They are unrelated gifts working independently', 'Peace produces Wisdom, not the other way around'], correct: 0, explanation: 'Wisdom judges all things by the highest cause (God), and this right ordering produces the fruit of Peace.' },
    { category: 'fruit', topic: 'joy', level: 3, q: 'How does the Fruit of Joy relate to the dark night of the soul described by St. John of the Cross?', answers: ['Joy persists at the deepest level of the soul even when all consolation is stripped away, because it is rooted in the will\'s union with God, not in feelings', 'Joy is lost during the dark night and must be regained afterward', 'The dark night proves joy is unreliable'], correct: 0, explanation: 'The dark night purifies joy from dependence on consolation, leaving a purer joy rooted in faith alone.' }
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

  // ===== REGISTER CATEGORIES WITH TEACHING MODULE =====
  // Maps existing data into the category-agnostic TeachingModule format.
  // This runs at load time so TeachingModule is ready for game.js.

  if (typeof TeachingModule !== 'undefined') {
    // Cardinal Virtues — questions use topic=virtue, subtopic=sub
    var cardinalTopics = {};
    Object.keys(CARDINAL_VIRTUES).forEach(function (vId) {
      var v = CARDINAL_VIRTUES[vId];
      cardinalTopics[vId] = {
        name: v.name,
        subtopics: v.subVirtues,
        subtopicNames: v.subNames
      };
    });
    TeachingModule.registerCategory('cardinal', {
      name: 'Cardinal Virtues',
      topics: cardinalTopics,
      masteryThreshold: 2,
      maxLevel: 3,
      levelsEnabled: true
    }, VIRTUE_QUESTIONS.map(function (q) {
      return { category: 'cardinal', topic: q.virtue, subtopic: q.sub, level: q.level || 1, q: q.q, answers: q.answers, correct: q.correct, explanation: q.explanation };
    }));

    // Gifts of the Holy Spirit
    var giftTopics = {};
    GIFTS_OF_SPIRIT.forEach(function (g) {
      giftTopics[g.id] = { name: g.name };
    });
    TeachingModule.registerCategory('gift', {
      name: 'Gifts of the Holy Spirit',
      topics: giftTopics,
      masteryThreshold: 2,
      maxLevel: 3,
      levelsEnabled: true
    }, GIFT_QUESTIONS);

    // Fruits of the Holy Spirit
    var fruitTopics = {};
    FRUITS_OF_SPIRIT.forEach(function (f) {
      fruitTopics[f.id] = { name: f.name };
    });
    TeachingModule.registerCategory('fruit', {
      name: 'Fruits of the Holy Spirit',
      topics: fruitTopics,
      masteryThreshold: 2,
      maxLevel: 3,
      levelsEnabled: true
    }, FRUIT_QUESTIONS);
  }

  return {
    CARDINAL_VIRTUES,
    THEOLOGICAL_VIRTUES,
    GIFTS_OF_SPIRIT,
    FRUITS_OF_SPIRIT,
    SUNDAY_REFLECTIONS,
    VIRTUE_QUESTIONS,
    MORAL_CHOICES,
    GIFT_QUESTIONS,
    FRUIT_QUESTIONS
  };
})();
