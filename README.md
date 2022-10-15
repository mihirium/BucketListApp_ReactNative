# React Native project by Mihir Sangameswar: mas6tm

This is a bucket list app created by Mihir Sangameswar (mas6tm) using React Native and Expo. It comes pre-populated with 2 items. You can add items by clicking the plus button in the left hand corner or edit pre-existing ones by clicking on the item you want to edit. You may also change an item to completed or not completed by clicking the checkbox.

## Special Features

None

## Lessons Learned

I learned the quickest way to pass information is through both Async storage and parameters. This is by far the easiest way as you can pass an item for quick setting, and if you want to update a large item that's global to the project you can update it through Async storage. You could use redux, but this is slightly more complicated as you have to handle all 4 of the "functions" (store, action, dispatcher, and reducer). I also learned the difference between these two. Redux is a global state variable. This means its very easy to modify global variables as you don't need to pass anything or worry about scope, you just call a function. The downside of this is that this is a state variable, so after you close the app, all the information goes away. This is not very useful for a bucket list app. Async is global storage that you can access if you use the right functions and pass the right key and this info stays in the app forever until it is cleared.

Hooks are very useful. useState is good for keeping quick temporary variables related to that specific screen you are using. The two that were the most helpful were useEffect and useFocusEffect. useEffect runs AFTER the component is re-rendered (you can also adjust this based on the second parameter), which makes it useful when refresing a page, but it does not account for the goBack button on navigation. For this we can use useFocusEffect that is the same thing as useEffect but it run whenever the screen is unfocused, so whenever you just move to a new screen.

Overall, I found react native pretty interesting. I definitely had to struggle with the async calls and CSS just hurts to use, but I found I improved my ability to create with react and I also became pretty good at reading documentation.
