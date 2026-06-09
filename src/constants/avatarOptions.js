export const DEFAULT_AVATAR_ID = 'sprout';

export const avatarOptions = [
    {
        id: 'sprout',
        icon: 'leaf-outline',
        color: '#4CAF50',
        label: 'Broto',
    },
    {
        id: 'flower',
        icon: 'flower-outline',
        color: '#E879F9',
        label: 'Flor',
    },
    {
        id: 'sunny',
        icon: 'sunny-outline',
        color: '#F59E0B',
        label: 'Sol',
    },
    {
        id: 'water',
        icon: 'water-outline',
        color: '#2563EB',
        label: 'Água',
    },
    {
        id: 'earth',
        icon: 'earth-outline',
        color: '#8B5E34',
        label: 'Terra',
    },
];

export function getAvatarById(avatarId) {
    return (
        avatarOptions.find((avatar) => avatar.id === avatarId) ||
        avatarOptions.find((avatar) => avatar.id === DEFAULT_AVATAR_ID)
    );
}