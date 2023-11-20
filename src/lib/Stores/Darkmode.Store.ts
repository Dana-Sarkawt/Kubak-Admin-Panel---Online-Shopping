
import { writable } from 'svelte/store';

// Create a writable store to hold the dark mode state
export const darkMode = writable("");

// Function to check if the HTML tag class contains "dark" and update the writable store accordingly
export function checkDarkMode() {
    const htmlTag = document.documentElement;
    const classList = htmlTag.classList;
    
    if (classList.contains('dark')) {
        darkMode.set("dark");
        console.log("Dark mode is on");
        
    } else {
        darkMode.set("");
        console.log("Dark mode is off");
    }
}
