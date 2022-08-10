/// <reference types="@workadventure/iframe-api-typings" />

import { bootstrapExtra } from "@workadventure/scripting-api-extra";

console.log('Script started successfully');

let currentPopup: any = undefined;

// Waiting for the API to be ready
WA.onInit().then(() => {
    console.log('Scripting API ready');
    console.log('Player tags: ',WA.player.tags)

    WA.controls.disablePlayerProximityMeeting()

    WA.room.area.onEnter("Goddess").subscribe(() => {
        WA.room.hideLayer("darkness")
        currentPopup = WA.ui.openPopup(
            "GoddessPopup",
            "Well done adventurer, you've gone through half the maze. But the most important thing is still to come. Hurry up!",
            []);
    })
    WA.room.area.onLeave("Goddess").subscribe(() => {
        WA.room.showLayer("darkness")
        closePopup()
    })

    WA.room.area.onEnter("Finish").subscribe(() => {
        WA.room.hideLayer("torchOFF")
        WA.room.showLayer("torchON")
        currentPopup = WA.ui.openPopup(
            "FinishPopup",
            "Congratulations! You are a finisher. Post a proof-of-win with a screenshot and your Discord ID and if you are among the first 20 you will win the OG role!",
            []);
    })
    WA.room.area.onLeave("Finish").subscribe(closePopup)

    // The line below bootstraps the Scripting API Extra library that adds a number of advanced properties/features to WorkAdventure
    bootstrapExtra().then(() => {
        console.log('Scripting API Extra ready');
    }).catch(e => console.error(e));

}).catch(e => console.error(e));

function closePopup(){
    if (currentPopup !== undefined) {
        currentPopup.close();
        currentPopup = undefined;
    }
}


export {};
