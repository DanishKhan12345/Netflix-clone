export interface IProfile {
    id: string;
    userId: string;
    name: string;
    avatar: string;
    isKids: boolean;
    isLocked: boolean;
    pin?: string;
    preferences: {
        language: string;
        autoplay: boolean;
        contentRestrictions: string[];
    };
    watchHistory: string[];
} 