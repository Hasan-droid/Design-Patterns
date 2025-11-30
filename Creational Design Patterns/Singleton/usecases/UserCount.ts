/* eslint-disable */
// @ts-nocheck

//Before Singleton
// =========================================================
// ❌ BAD: Using global variables
let userCount = 0; // Global variable
let appSettings = "dark"; // Global variable

// Different parts of app use these globals
function addUser() {
  userCount++; // Anyone can modify this
  console.log(`Users: ${userCount}`);
}

function changeTheme() {
  appSettings = "light"; // Anyone can change this
}

function displayStats() {
  console.log(`Users: ${userCount}, Theme: ${appSettings}`);
}

// Problems:
userCount = -999; // Oops! Anyone can break it
appSettings = undefined;

//After Singleton
// =========================================================
// ✅ GOOD: Using Singleton instead of globals
class AppData {
  private static instance: AppData;
  private userCount = 0;
  private theme = "dark";

  private constructor() {} // Can't create new instances

  static getInstance() {
    if (!AppData.instance) {
      AppData.instance = new AppData();
    }
    return AppData.instance;
  }

  addUser() {
    this.userCount++;
    console.log(`Users: ${this.userCount}`);
  }

  changeTheme(newTheme: string) {
    this.theme = newTheme;
  }

  getStats() {
    return `Users: ${this.userCount}, Theme: ${this.theme}`;
  }
}

// Usage - Global access but protected
function addUser() {
  AppData.getInstance().addUser(); // Safe access
}

function changeTheme() {
  AppData.getInstance().changeTheme("light"); // Controlled access
}

function displayStats() {
  console.log(AppData.getInstance().getStats()); // Safe access
}

// ✅ Can't break it accidentally
// AppData.userCount = -999;  // ❌ Won't work - it's private!
// new AppData();
