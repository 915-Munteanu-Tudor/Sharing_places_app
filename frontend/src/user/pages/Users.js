import React from "react";
import '../components/UsersList';
import UsersList from "../components/UsersList";

const Users = () => {
    const USERS = [
        {
            id: 'u1', 
            name: 'Tudor Munteanu', 
            image: 'https://img.freepik.com/free-photo/waist-up-portrait-handsome-serious-unshaven-male-keeps-hands-together-dressed-dark-blue-shirt-has-talk-with-interlocutor-stands-against-white-wall-self-confident-man-freelancer_273609-16320.jpg?w=1060&t=st=1666535345~exp=1666535945~hmac=2660b0c5cb158c904ed342e06b88a0496b674122eaa628f5d9c3f4872d26d23d', 
            places: 1,
        }
    ];

    return (
        <UsersList items={USERS} />
    );
};

export default Users;