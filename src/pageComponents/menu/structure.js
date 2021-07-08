//Menu Structure






//Array of objects
//Top level items can be dropdown or link
//Second level items must be a link
//View- is a string which sets permissions
//link- is the direct path
//linkTo- dynamic linking set in topMenu.js
//links- sets the dropdown


const curr_user = localStorage.user ?  JSON.parse(localStorage.user) : false


export default  [
    {name: "Sign Up", view: "no_user", symbol: "user", links: [
        {name: "Register", view: "all", link: '/users/register', symbol: ""},
        {name: "Login", view: "all", link: '/users/login', symbol: ""},
        {name: "Forgot My Password", view: "all", link: '/users/forgottenPassword', symbol: ""},
    ]}, 
    {name: "Recruits", view: "end_user", link: '/athletes', symbol: "running"},
    {name: "Messages", view: "end_user", link: '/messages', symbol: "comments"},
    {name: "Team and Staff", view: "end_user", link: `/teams/${curr_user && curr_user.userInfo ? curr_user.userInfo.team_id : ""}`, symbol: "users"},
    {name: "Dashboard", view: "end_user", link: '/users/dashboard', symbol: "user-circle"},
    {name: "Admin", view: "admin_user", symbol: "user", links: [   
        {name: "User List", view: 'admin', link: '/admin/users', symbol: "users"},
        {name: "Logs", view: 'admin', link: '/admin/logs', symbol: "cogs"},
        {name: "Feedback", view: 'admin', link: '/feedback', symbol: "comments"},
    ]},
    {name: "Contact RecruitAI", view: "all", link: '/feedback/provide', symbol: "comments"},
    
    {name: "Logout", view: 'logged_in', link: '/users/logout', symbol: "sign-out-alt"}
]
