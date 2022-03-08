const commonElements = (array1, array2) => {
    return array1.some(item => array2.includes(item));
}

export const getProfile = (user) => {
    return JSON.parse(JSON.stringify(user)).profile;
}

export const getPreferences = (user) => {
    return JSON.parse(JSON.stringify(user)).preferences;
}

export const getId = (user) => {
    return JSON.parse(JSON.stringify(user))._id;
}

export const commonHobbies = (user1, user2) => {
    const user1Profile = getProfile(user1);
    const user2Profile = getProfile(user2);
    return commonElements(user1Profile.hobbies, user2Profile.hobbies);
}

export const matchSexuality = (user1, user2) => {
    const user1Profile = getProfile(user1);
    const user1Preferences = getPreferences(user1);
    const user2Profile = getProfile(user2);
    const user2Preferences = getPreferences(user2);
    if (user1Profile.gender === 'male' && (user1Preferences.sexuality === 'bisexual' || user1Preferences.sexuality === 'gay')) {
        if (user2Profile.gender === 'male' && (user2Preferences.sexuality === 'bisexual' || user2Preferences.sexuality === 'gay')) {
            return true;
        }
        if (user2Profile.gender === 'female' && (user2Preferences.sexuality === 'bisexual' || user2Preferences.sexuality === 'straight')) {
            return true;
        }
    }
    if (user1Profile.gender === 'male' && user1Preferences.sexuality === 'straight') {
        if (user2Profile.gender === 'female' && (user2Preferences.sexuality === 'bisexual' || user2Preferences.sexuality === 'straight')) {
            return true;
        }
    }
    if (user1Profile.gender === 'female' && (user1Preferences.sexuality === 'bisexual' || user1Preferences.sexuality === 'lesbian')) {
        if (user2Profile.gender === 'female' && (user2Preferences.sexuality === 'bisexual' || user2Preferences.sexuality === 'lesbian')) {
            return true;
        }
        if (user2Profile.gender === 'male' && (user2Preferences.sexuality === 'bisexual' || user2Preferences.sexuality === 'straight')) {
            return true;
        }
    }
    if (user1Profile.gender === 'female' && user1Preferences.sexuality === 'straight') {
        if (user2Profile.gender === 'male' && (user2Preferences.sexuality === 'bisexual' || user2Preferences.sexuality === 'straight')) {
            return true;
        }
    }
    return false;
}

export const matchAge = (user1, user2) => {
    const user1Profile = getProfile(user1);
    const user1Preferences = getPreferences(user1);
    const user2Profile = getProfile(user2);
    const user2Preferences = getPreferences(user2);
    if (user2Profile.age >= user1Preferences.minAge && user2Profile.age <= user1Preferences.maxAge) {
        if (user1Profile.age >= user2Preferences.minAge && user1Profile.age <= user2Preferences.maxAge) {
            return true;
        }
    }
    return false;
}

export const matchReligion = (user1, user2) => {
    const user1Profile = getProfile(user1);
    const user1Preferences = getPreferences(user1);
    const user2Profile = getProfile(user2);
    const user2Preferences = getPreferences(user2);
    if (user1Preferences.religion.includes(user2Profile.religion)) {
        if (user2Preferences.religion.includes(user1Profile.religion)) {
            return true;
        }
    }
    return false;
}