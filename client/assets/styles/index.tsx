import { StyleSheet, Dimensions } from "react-native";

export const PRIMARY_COLOR = "#2B4B82";
export const SECONDARY_COLOR = "#FBA5C0";
export const WHITE = "#FFFFFF";
export const GRAY = "#757E90";
export const DARK_GRAY = "#363636";
const ERROR_MESSAGE = "#ff0033";
const BLACK = "#000000";

const ONLINE_STATUS = "#46A575";
const OFFLINE_STATUS = "#D04949";

export const STAR_ACTIONS = "#FFA200";
export const LIKE_ACTIONS = "#F0ABC1";
export const DISLIKE_ACTIONS = "#363636";
export const FLASH_ACTIONS = "#5028D7";

// const ICON_FONT = "tinderclone";

const DIMENSION_WIDTH = Dimensions.get("window").width;
const DIMENSION_HEIGHT = Dimensions.get("window").height;

export default StyleSheet.create({
    // COMPONENT - CARD ITEM
    containerCardItem: {
        backgroundColor: WHITE,
        borderRadius: 8,
        alignItems: "center",
        margin: 10,
        shadowOpacity: 0.05,
        shadowRadius: 10,
        shadowColor: BLACK,
        shadowOffset: { height: 0, width: 0 }
    },
    matchesCardItem: {
        marginTop: -35,
        backgroundColor: PRIMARY_COLOR,
        paddingVertical: 7,
        paddingHorizontal: 20,
        borderRadius: 20
    },
    matchesTextCardItem: {
        // fontFamily: ICON_FONT,
        color: WHITE
    },
    descriptionCardItem: {
        color: GRAY,
        textAlign: "center",
    },
    status: {
        paddingBottom: 10,
        flexDirection: "row",
        alignItems: "center"
    },
    statusText: {
        color: GRAY,
        fontSize: 12
    },
    online: {
        width: 6,
        height: 6,
        backgroundColor: ONLINE_STATUS,
        borderRadius: 3,
        marginRight: 4
    },
    offline: {
        width: 6,
        height: 6,
        backgroundColor: OFFLINE_STATUS,
        borderRadius: 3,
        marginRight: 4
    },
    actionsCardItem: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 30
    },
    button: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: WHITE,
        marginHorizontal: 7,
        alignItems: "center",
        justifyContent: "center",
        shadowOpacity: 0.15,
        shadowRadius: 20,
        shadowColor: DARK_GRAY,
        shadowOffset: { height: 10, width: 0 }
    },
    miniButton: {
        width: 40,
        height: 40,
        borderRadius: 30,
        backgroundColor: WHITE,
        marginHorizontal: 7,
        alignItems: "center",
        justifyContent: "center",
        shadowOpacity: 0.15,
        shadowRadius: 20,
        shadowColor: DARK_GRAY,
        shadowOffset: { height: 10, width: 0 }
    },
    star: {
        // fontFamily: ICON_FONT,
        color: STAR_ACTIONS
    },
    like: {
        fontSize: 25,
        // fontFamily: ICON_FONT,
        color: LIKE_ACTIONS
    },
    dislike: {
        fontSize: 25,
        // fontFamily: ICON_FONT,
        color: DISLIKE_ACTIONS
    },
    flash: {
        // fontFamily: ICON_FONT,
        color: FLASH_ACTIONS
    },

    // COMPONENT - CITY
    city: {
        backgroundColor: WHITE,
        padding: 10,
        borderRadius: 20,
        width: 90,
        shadowOpacity: 0.05,
        shadowRadius: 10,
        shadowColor: BLACK,
        shadowOffset: { height: 0, width: 0 }
    },
    cityText: {
        // fontFamily: ICON_FONT,
        color: DARK_GRAY,
        fontSize: 13
    },

    // COMPONENT - FILTERS
    filters: {
        backgroundColor: WHITE,
        padding: 10,
        borderRadius: 20,
        width: 70,
        shadowOpacity: 0.05,
        shadowRadius: 10,
        shadowColor: BLACK,
        shadowOffset: { height: 0, width: 0 }
    },
    filtersText: {
        // fontFamily: ICON_FONT,
        color: DARK_GRAY,
        fontSize: 13
    },

    // COMPONENT - MESSAGE
    containerMessage: {
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-start",
        flexDirection: "row",
        paddingHorizontal: 10,
        width: DIMENSION_WIDTH - 100
    },
    avatar: {
        borderRadius: 30,
        width: 60,
        height: 60,
        marginRight: 20,
        marginVertical: 15
    },
    message: {
        color: GRAY,
        fontSize: 12,
        paddingTop: 5
    },

    // COMPONENT - PROFILE ITEM
    containerProfileItem: {
        backgroundColor: WHITE,
        paddingHorizontal: 10,
        paddingBottom: 25,
        margin: 20,
        borderRadius: 8,
        marginTop: -65,
        shadowOpacity: 0.05,
        shadowRadius: 10,
        shadowColor: BLACK,
        shadowOffset: { height: 0, width: 0 }
    },
    matchesProfileItem: {
        width: 131,
        marginTop: -15,
        backgroundColor: PRIMARY_COLOR,
        paddingVertical: 7,
        paddingHorizontal: 20,
        borderRadius: 20,
        textAlign: "center",
        alignSelf: "center"
    },
    matchesTextProfileItem: {
        // fontFamily: ICON_FONT,
        color: WHITE
    },
    name: {
        paddingTop: 25,
        paddingBottom: 5,
        color: DARK_GRAY,
        fontSize: 30,
        textAlign: "center"
    },
    descriptionProfileItem: {
        color: GRAY,
        textAlign: "center",
        paddingBottom: 20,
        fontSize: 13
    },
    info: {
        paddingVertical: 8,
        flexDirection: "row",
        alignItems: "center"
    },
    iconProfile: {
        // fontFamily: ICON_FONT,
        fontSize: 12,
        color: DARK_GRAY,
        paddingHorizontal: 10
    },
    infoContent: {
        color: GRAY,
        fontSize: 13,
        // paddingHorizontal: 10
    },
    infoContentHobbies: {
        flex: 1,
        flexWrap: 'wrap',
        flexDirection: 'column'
    },

    // CONTAINER - GENERAL
    bg: {
        flex: 1,
        resizeMode: "cover",
        width: DIMENSION_WIDTH,
        height: DIMENSION_HEIGHT
    },
    top: {
        paddingTop: 30,
        marginHorizontal: 10,
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        // zIndex: 100
    },
    flatlistView: {
        paddingTop: 50
        // marginTop: 40

    },
    title: { paddingBottom: 10, fontSize: 22, color: DARK_GRAY },
    icon: {
        // fontFamily: ICON_FONT,
        fontSize: 20,
        color: DARK_GRAY,
        paddingRight: 10
    },

    // CONTAINER - HOME
    containerHome: {
        marginHorizontal: 10,
    },

    // CONTAINER - MATCHES
    containerMatches: {
        justifyContent: "space-between",
        flex: 1,
        paddingHorizontal: 10
    },

    // CONTAINER - MESSAGES
    containerMessages: {
        justifyContent: "space-between",
        flex: 1,
        paddingHorizontal: 10,
    },

    // CONTAINER - PROFILE
    containerProfile: { marginHorizontal: 0 },
    photo: {
        width: DIMENSION_WIDTH,
        height: DIMENSION_WIDTH,
        borderRadius: DIMENSION_WIDTH / 2
    },
    topIconLeft: {
        // fontFamily: ICON_FONT,
        fontSize: 20,
        color: WHITE,
        paddingLeft: 20,
        marginTop: -20,
        transform: [{ rotate: "90deg" }]
    },
    topIconRight: {
        // fontFamily: ICON_FONT,
        fontSize: 20,
        color: WHITE,
        paddingRight: 20
    },
    actionsProfile: {
        justifyContent: "center",
        flexDirection: "row",
        alignItems: "center"
    },
    // iconButton: { fontFamily: ICON_FONT, fontSize: 20, color: WHITE },
    iconButton: { fontSize: 20, color: WHITE },
    textButton: {
        // fontFamily: ICON_FONT,
        fontSize: 15,
        color: DARK_GRAY,
        paddingLeft: 5
    },
    circledButton: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: PRIMARY_COLOR,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 10,
        marginLeft: 10
    },
    roundedButton: {
        justifyContent: "center",
        flexDirection: "row",
        alignItems: "center",
        marginLeft: 10,
        marginRight: 10,
        height: 40,
        borderRadius: 25,
        backgroundColor: SECONDARY_COLOR,
        paddingHorizontal: 20,
    },

    // MENU
    tabButton: {
        paddingTop: 20,
        paddingBottom: 30,
        alignItems: "center",
        justifyContent: "center",
        flex: 1
    },
    tabButtonText: {
        textTransform: "uppercase"
    },
    iconMenu: {
        // fontFamily: ICON_FONT,
        height: 20,
        paddingBottom: 7
    },
    // test
    logoutButton: {
        backgroundColor: LIKE_ACTIONS,
        height: 44,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 22,
        marginTop: 10,
        top: 650,
        left: 25
    },
    /**
     * Sign In/Sign Up styles
     */
    authContainer: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
    },
    indicator: {
        justifyContent: 'center',
        flex: 1,
    },
    form: {
        width: '86%',
        paddingTop: 35
    },
    input: {
        fontSize: 20,
        borderColor: '#707070',
        borderBottomWidth: 1,
        paddingBottom: 1.5,
        marginTop: 25.5,
    },
    authButton: {
        backgroundColor: LIKE_ACTIONS,
        height: 44,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 22
    },
    authError: {
        color: ERROR_MESSAGE,
        fontSize: 20,
        paddingTop: 10
    },
    /**
     * Profile Modal
     */
    modalContainer: {
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalPhotoContainer: {
        marginTop: 30,
        elevation: 2,
        height: 200,
        width: 200,
        backgroundColor: '#efefef',
        borderRadius: 999,
        overflow: 'hidden',
    },
    uploadBtnContainer: {
        opacity: 0.7,
        position: 'absolute',
        bottom: 0,
        backgroundColor: 'lightgrey',
        width: '100%',
        height: '25%',
    },
    uploadBtn: {
        display: 'flex',
        alignItems: "center",
        justifyContent: 'center',
    },
    addProfileButtonContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    addProfileButton: {
        marginHorizontal: 15,
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'space-between',
        height: 40,
        marginTop: 40,
        marginBottom: 80,
        borderRadius: 10,
        flexBasis: '40%',
    },
    /**
    * Subscription Modal
    */
    subscriptionContainer: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: WHITE,
        padding: 40,
        margin: 45,
        marginBottom: 30,
        borderRadius:10,
        height: 600,
        width: 360,
        shadowOpacity: 0.10,
        shadowRadius: 10,
        shadowColor: BLACK,
    },
    subscriptionOptions: {
        flex: 1,
        backgroundColor: SECONDARY_COLOR,
        paddingTop: 4,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,
        borderBottomLeftRadius: 20,
        margin: 10,
        alignItems: "center",
    },
    textTitles: {
        fontSize: 22,
        paddingLeft: 79
    },
    textPlanTitles: {
        fontSize: 22
    },
    textDescription: {
        fontSize: 15,
        margin: 1,
        paddingTop: 5,
        paddingBottom: 5
    },
    addRadioButton: {
        backgroundColor: PRIMARY_COLOR
    },
    addSubscriptionButton: {
        marginHorizontal: 15,
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'space-between',
        height: 40,
        marginTop: 0,
        marginBottom: 10,
        borderRadius: 10,
        flexBasis: '45%',
        color: SECONDARY_COLOR,
    },
    textSubscriptionButton: {
        color: 'white'
    },
    addSubscriptionButtonContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    subscriptionCircledButton: {
        width: 40,
        height: 40,
        borderRadius: 25,
        backgroundColor: PRIMARY_COLOR,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 10,
        marginLeft: 10,
    },
    /* 
    * Settings Styles
    */
    settingsContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    settingsButton: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    }
});