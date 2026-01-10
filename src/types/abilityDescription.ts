export type AbilityType = 'speed' | 'combat' | 'modifier' | 'passive' | 'special';

export interface AbilityDescription {
    name: string;
    type: AbilityType;
    description: string;
    icon?: string;
    reviewed?: boolean;
}
