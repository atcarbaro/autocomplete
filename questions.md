1. What is the difference between Component and PureComponent? give an
   example where it might break my app. - A React’s Pure Component is a component that is rendered only when the props received are different from the nextProps. i.e: PureComponent with a props.children will cause that our shallow comparison fails props.children === props.children. So our component won’t render anymore.
2. Context + ShouldComponentUpdate might be dangerous. Can think of why is
   that? - ShouldComponentUpdate method re-render our app when there’s a change in our state or props values. If we update our Context Provider’s value will cause another re-render so we could have an infinite re-render loop.
3. Describe 3 ways to pass information from a component to its PARENT.
   - We can use Context API to store data from the child element to it’s parent.
   - We can use Redux to save data in our
   - We can pass a function to children component to update the value in the parent one.
4. Give 2 ways to prevent components from re-rendering.
   - We can use a PureComponent to avoid re-rendering.
   - We can memoized our component using useCallback or useMemo.
5. What is a fragment and why do we need it? Give an example where it might
   break my app. - With Fragment you can group different elements inside of it without using a parent node. i.e: If you have two elements at the same level without a fragment, your app might fail.
6. Give 3 examples of the HOC pattern.
   - reuse a component receiving always a props.chidren value.
   - the mapStateToProps function is a HOC that receives our regular component and retrieves the component with redux values.
     -the connect function from react-redux help us to connect our react component to the redux store.
7. what's the difference in handling exceptions in promises, callbacks and
   async...await. - with async you create a function which return a promise and await we can have a more polish and well written code to resolve our promise without using the callback hell. - a callback needs to return a value once our promise is resolved in order to access to it next time. - a promise() is a method which returns a value once an actions is resolved or rejected.
8. How many arguments does setState take and why is it async.
   - it has 2. The updater object and the callback function with the updated value.
   - is async because you need to wait for the component to re-render in order to update the component, if you want to retrieve the current value before re-render you need use the callback function.
9. List the steps needed to migrate a Class to Function Component.
   - we need get rid of the reserved word class.
   - you don’t need to extend from React.Component
   - remove the constructor and props/states inside of it
   - remove all the lifecycle methods such as componentDidMount or componentWillUnmount
   - you don’t need to use the render function anymore since our whole function component is the render now.
10. List a few ways styles can be used with components.
    - inline styles object
    - import styles css
    - use style component
11. How to render an HTML string coming from the server.
    you can sanitize your data with the dangerouslySetInnerHTML prop.
