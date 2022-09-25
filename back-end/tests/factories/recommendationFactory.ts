function __createMusic(
        youtubeMethod : "rightLink" | "wrongLink"
    ){
    const youtubeLink = {
        rightLink : "https://www.youtube.com/watch?v=pYcSTrdDu5g",
        wrongLink : "www.google.com"
    };
    return {
        name : "Majestica - Night Call Girl",
        youtubeLink : youtubeLink[youtubeMethod]
    };
};

export default {
    __createMusic
}