Bugs:
- Heal does not work
- Charm does not recalculate winner
- Evade does not skip damage

Optimizations
- Skip passive abilities phase if there are no passive abilities
- Obey path requirements in equipment (filter)

Skills:
- Implement missing special skills
- Consolidate hero and enemy skills

Features:
- Support nodes
- Support full customization of state during combat
- Implement skill checks
- Support multiple enemies
- Support undo

Refactoring:
- Convert from CSV to JSON during app load, avoiding the intermediate steps