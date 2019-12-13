import React from 'react';
import { Link } from 'react-router-dom';

const Menu = () => {
    return (
        <ul>
            <li><Link to="/admin/addProduct">상품 등록</Link></li>
            <li><Link to="/admin/deleteProduct">상품 삭제</Link></li>

        </ul>

    );
}

export default Menu;