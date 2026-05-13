# Carbon Calculator Gamification Framework

## Theoretical Foundation

This gamification strategy integrates multiple evidence-based frameworks to maximize user engagement, joy, and carbon-reduction behavior change.

### Core Frameworks

#### 1. **Octalysis (Yu-kai Chou)** — 8 Core Drives
The design addresses all 8 drives to create intrinsic motivation:

1. **Epic Meaning & Calling** 
   - Narrative: "Architects as Climate Heroes" quest
   - You're part of building a sustainable future
   
2. **Development & Accomplishment**
   - Achievement badges for carbon milestones
   - Skill progression (Novice → Expert)
   - Visible progress bars
   
3. **Empowerment of Creativity & Feedback**
   - Design your project, see results instantly
   - Multiple analysis perspectives
   - "Unlock" advanced features
   
4. **Ownership & Possession**
   - Save and name projects
   - Build a portfolio of designs
   - Customizable carbon goals
   
5. **Social Influence & Relatedness**
   - Share project results
   - Compare to industry benchmarks
   - Community leaderboards (optional)
   
6. **Scarcity & Impatience**
   - Limited-time challenges (weekly/monthly)
   - Unlock system (unlock new materials/features)
   - Time-based streak bonuses
   
7. **Unpredictability & Curiosity**
   - Surprise tips on carbon reduction
   - Hidden easter eggs
   - Unlockable "Did You Know?" facts
   
8. **Loss & Avoidance**
   - Don't lose your streak
   - FOMO (Fear of Missing Out) on badges
   - Carbon debt visualization

#### 2. **Flow Theory (Csikszentmihalyi)** — Challenge/Skill Balance

**Progressive Difficulty Modes:**
- **Easy (Novice):** Guided inputs, pre-set values, high confidence
- **Medium (Intermediate):** Manual inputs, some defaults, learning
- **Hard (Advanced):** All manual, min guidance, exploration
- **Expert (Master):** Full lifecycle control, A1-A5 granularity

The calculator adjusts suggestion and feedback based on player skill level.

#### 3. **Self-Determination Theory (Ryan & Deci)** — Intrinsic Motivation

**Autonomy:** 
- Choose your own projects and goals
- No mandatory actions
- Multiple paths to success

**Competence:**
- Clear progression (Novice → Expert)
- Skill-building tutorials
- Immediate feedback on choices
- Achievable challenges

**Relatedness:**
- Share achievements
- Benchmark against peers
- See community impact

#### 4. **MDA Framework** — Design Approach

**Mechanics → Dynamics → Aesthetics**
- Mechanics: Points, badges, challenges, streak tracking
- Dynamics: Progression over time, competitive comparison, personal growth
- Aesthetics: Pride, accomplishment, discovery, joy

#### 5. **Fogg Behavior Model** — Behavior Triggers

**Motivation × Ability × Prompt = Behavior**
- **Motivation:** Emotional rewards, social recognition, progress
- **Ability:** Simple one-clicks, clear pathways, quick wins
- **Prompt:** "Save This Design!" "Share Your Achievement!" "Unlock Next Level"

---

## Gamification Features

### 1. Achievement Badge System

**Tier-Based Progression:**

#### Bronze Badges (Beginner)
- 🎯 **First Design** — Create your first carbon project
- 🌱 **Green Thumb** — Reduce material carbon by 10%
- 📊 **Data Detective** — Switch between 3+ analysis modes
- 🌍 **Carbon Conscious** — Calculate any project

#### Silver Badges (Intermediate)
- ⭐ **Efficiency Expert** — Achieve A-rated carbon efficiency
- 🌳 **Tree Planter** — Include tree offset in project
- 🔄 **Circular Thinker** — Maximize waste recycling (90%+)
- 🏗️ **Builder's Pride** — Complete 5 projects
- 💚 **Green Warrior** — Reduce total carbon 50% below average

#### Gold Badges (Advanced)
- 🏆 **Master Architect** — Achieve A+ efficiency 3+ times
- 🌲 **Forest Guardian** — Plant 100+ trees in projects
- 🎯 **Precision Engineer** — A-rated project in all 3 analysis modes
- 📈 **Trend Setter** — Unlock all challenge modes
- 🌍 **Climate Leader** — Share 10 projects with community

#### Platinum Badges (Expert)
- 👑 **Decarbonization Master** — 10 A+ projects
- 🚀 **Innovation Pioneer** — Use all materials, all modes, all difficulties
- 🌐 **Global Impact** — Reach 100 shared projects
- 🔬 **Research Scholar** — Read all educational tooltips
- 🎊 **Legend** — Achieve all other badges

**Badge Display:**
- Earned badges shown on profile
- Progress indicator for next badge (3/5 projects toward next tier)
- Badge tooltip explains how to earn it
- Celebratory animation when earned

### 2. Carbon Efficiency Rating System

**A-F Grading Scale** (Based on embodied + operational carbon):

| Grade | Embodied CO₂/m² | Operational CO₂/m²/yr | Status |
|-------|-----------------|----------------------|--------|
| **A+** | < 150 | < 10 | Exceptional |
| **A** | 150-200 | 10-15 | Excellent |
| **B** | 200-300 | 15-25 | Good |
| **C** | 300-400 | 25-35 | Average |
| **D** | 400-500 | 35-50 | Below Average |
| **F** | > 500 | > 50 | Poor |

**Visual Indicator:**
- Large grade letter in results panel (A = bright green, F = red)
- Benchmark comparison: "Top 10% of architects" or "Room for improvement"
- Suggested next step to improve grade

### 3. Challenge Modes

**Time-Limited Design Challenges:**

#### Weekly Challenges
- **Monday:** "Lowest Transport Impact" — Minimize A4 carbon
- **Wednesday:** "Zero Waste Wonder" — 100% recycling goal
- **Friday:** "Green Building" — Achieve B+ rating with local materials
- Reward: 10 XP + Special Badge participation

#### Monthly Challenges
- **Theme:** Different sustainability focus each month
  - January: "New Year, New Carbon Goals"
  - February: "Love Your Local Materials"
  - March: "Spring Growth" (tree planting)
  
- **Tiers:** Bronze (basic), Silver (intermediate), Gold (master)
- **Reward:** Tiered badges + unlock new features

#### Personal Challenges
- "Build Better Than Yesterday" — Beat your last project's rating
- "Material Master" — Design A-rated project with each material
- "Efficiency Quest" — Chain of 5 progressively harder targets

### 4. Unlock System (Progressive Feature Reveal)

**Level 1 (Novice)** — Unlocked at start
- Basic material selection
- Simple sliders
- A-F grading only

**Level 2 (Intermediate)** — After 3 projects
- All analysis modes (Lifecycle/Impact/Breakdown)
- Histogram modes (Absolute/Percentage/Cumulative)
- Challenge modes

**Level 3 (Advanced)** — After completing 1 challenge
- Hard/Expert difficulty modes
- Material breakdown details
- Regional variation data
- Advanced tips and strategies

**Level 4 (Master)** — After 10 A-grade projects
- A1-A5 granular control
- Custom material input
- Research papers (links to sources)
- Community analytics

**Level 5 (Legend)** — After all badges
- API access for integration
- Custom benchmarking
- Export to PDF/BIM formats
- Mentor mode (help others)

### 5. Streak System & Consistency Rewards

**Daily Streak Counter:**
- "🔥 7-Day Streak!" appears when you design projects on consecutive days
- Multiplier: 1.5x XP on day 7, 2x XP on day 30
- Broken streak? Grace period (48 hours) to resume
- Streak leaderboard (top 10 weekly)

**Rewards per Streak:**
- Day 3: Unlock "Quick Tips" feature
- Day 7: Bonus badge "Consistent Creator"
- Day 14: +1 unlock level
- Day 30: Platinum badge "Habit Master"

### 6. Shareable Project Cards

**One-Click Share:**
```
🏗️ My Carbon-Smart Building
━━━━━━━━━━━━━━━━━━━━━
Grade: A- | Carbon: 185 kg/m²
Material: Timber (25% transport, smart choice!)
Trees Planted: 50 🌳
Efficiency vs Industry Avg: Top 15%
━━━━━━━━━━━━━━━━━━━━━
I designed this using @ProyectualStudio's
Carbon Calculator. Join the quest!
🔗 [Design Your Project]
```

**Social Features:**
- Share to Twitter/LinkedIn with emoji-rich summary
- Shareable project URL (no login needed to view)
- Community gallery (all public projects visible)
- "Reactions" on shared projects (👍 🔥 🌱 💚)

### 7. Micro-Rewards & Celebration Moments

**Instant Celebrations:**
- Particle confetti animation when earning badge
- Toast notification: "🎉 You've earned the 'Green Thumb' Badge!"
- Sound effect (optional, can disable)
- Progress bar animation when leveling up

**Encouraging Messages:**
- Design below-average: "Opportunity to improve! Hint: Check cement."
- Design A-rated: "🌟 Excellent work! You're in top 15% of projects."
- Reach streak: "🔥 Keep the momentum going!"

**Small Wins:**
- "First time using Density Histogram?" → Instant XP
- "Experimented with all materials?" → Badge unlock
- "Tried Hard mode?" → Difficulty badge

### 8. Narrative & Storytelling

**Framing:** "Architects as Climate Heroes"

**Opening Narrative:**
> "Every building you design shapes the future. Your choices today — in materials, processes, transportation — determine the carbon legacy of tomorrow. 
>
> Join architects worldwide in the **Green Building Quest**: 
> Design carbon-smart buildings, solve climate challenges, unlock innovations, and become a **Decarbonization Master**.
>
> Ready to design your first hero building?"

**In-Game Language:**
- Not "inputs" but "Design decisions"
- Not "calculate" but "Calculate carbon impact"
- Not "results" but "Achievement unlocked"
- Tooltips use encouraging language: "Smart choice!" "Expert insight!"

**Quest Line:**
1. **Novice Quest:** "Meet Your First Material" (design 1 project)
2. **Apprentice Quest:** "Master the Analysis Modes" (use all 3 pie modes)
3. **Builder Quest:** "Conquer a Challenge" (complete 1 weekly challenge)
4. **Expert Quest:** "Become an A-Rated Architect" (5 A+ designs)
5. **Master Quest:** "Unlock the Secrets" (reach level 4)
6. **Legend Quest:** "Leave Your Legacy" (earn all badges)

### 9. Educational Integration (Hidden Learning)

**"Did You Know?" Facts:**
Random knowledge bits displayed on:
- Initial page load
- After each project save
- When hovering badges

**Examples:**
- "Cement production accounts for 88% of concrete's carbon. Using low-carbon cement can cut embodied carbon by 40%!"
- "Timber's carbon footprint depends heavily on transportation distance. Local sourcing can save 20% of embodied carbon."
- "Steel smelting methods vary: EAF (scrap-based) emits 65% less than BF-BOF."

**Unlockable Research Papers:**
- Level 3: Access links to ARUP embodied carbon studies
- Level 4: NREL mass timber research, World Steel reports
- Level 5: Full academic paper repository

### 10. Benchmarking & Comparison

**Personal Benchmarks:**
- Your avg project grade over time
- Your best project (highest achievement)
- Your streak (current + personal record)

**Industry Benchmarks:**
- "Your A- design ranks better than 85% of projects"
- "Residential average: C+ | Your project: B" 
- "Your timber choices save 20% vs industry average"

**Leaderboards (Optional, Privacy-Conscious):**
- Opt-in sharing only
- Anonymized ("Architect #4521")
- Category-based: Best A+ Designs, Most Shared, Longest Streak
- Weekly reset to encourage new submissions

---

## Implementation Strategy

### Phase 1: Core Gamification (Week 1-2)
✓ Achievement badge system
✓ A-F grading display
✓ Celebration animations
✓ Narrative framing (UI text updates)

### Phase 2: Progression Systems (Week 2-3)
✓ Unlock system (feature gating)
✓ Challenge modes
✓ Streak tracking
✓ Micro-rewards

### Phase 3: Social & Sharing (Week 3-4)
✓ Shareable project cards
✓ Benchmarking display
✓ Community features (leaderboard)
✓ "Did You Know?" facts

### Phase 4: Analytics & Refinement (Week 4+)
- Track engagement metrics
- A/B test reward strategies
- Refine difficulty/unlock balance
- Gather user feedback

---

## Design Principles

1. **Non-Intrusive:** Gamification enhances, doesn't interrupt calculator
2. **Meaningful:** Every badge/reward teaches carbon concepts
3. **Inclusive:** Works for all skill levels and learning styles
4. **Ethical:** No manipulative dark patterns; transparent systems
5. **Educational:** Gamification reinforces sustainability knowledge
6. **Social:** Optional sharing; no pressure to compare publicly

---

## Key Metrics (What to Track)

- **Engagement:** % users who earn badges, average session time
- **Behavior Change:** Do challenges drive new project types?
- **Learning:** Do players use all analysis modes?
- **Sharing:** How many projects shared per week?
- **Retention:** Users returning weekly/monthly

---

## References

- [Octalysis Framework - Yu-kai Chou](https://yukaichou.com/gamification-examples/octalysis-gamification-framework/)
- [Self-Determination Theory & Gamification](https://yukaichou.com/gamification-analysis/self-determination-theory-guide-to-ryan-and-decis-motivation-framework/)
- [Flow: Psychology of Optimal Experience - Csikszentmihalyi](https://www.researchgate.net/publication/279749323_Gamification_From_the_Perspective_of_Self-Determination_Theory_and_Flow)
- [MDA Framework - Mechanics, Dynamics, Aesthetics](https://deliberategamedesign.com/mda-framework/)
- [Fogg Behavior Model](https://www.behaviormodel.org/)
- [Actionable Gamification - Yu-kai Chou](https://yukaichou.com/actionable-gamification-book/)
