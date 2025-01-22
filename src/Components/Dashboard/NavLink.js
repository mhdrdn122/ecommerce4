import { faCartPlus, faPlus, faUsers } from "@fortawesome/free-solid-svg-icons";

export  const links = [
    {
        path:"users",
        title : "user",
        icon : faUsers,
        role:['1995']
    },
    {
        path:"add-user",
        title : "Add User",
        icon : faPlus,
        role:['1995']

    },
    {
        path:"categories",
        title : "Categories",
        icon : faCartPlus,
        role:['1995','1999']

    },{
        path:"add-category",
        title : "Add Category",
        icon : faPlus,
        role:['1995','1999']

    },
    {
        path:"products",
        title : "Products",
        icon : faCartPlus,
        role:['1995','1999']

    },{
        path:"add-product",
        title : "Add Product",
        icon : faPlus,
        role:['1995','1999']

    },
    
]