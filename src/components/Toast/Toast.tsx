import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ToastComponent: React.FC = () => <ToastContainer autoClose={3000} />;

export default ToastComponent;