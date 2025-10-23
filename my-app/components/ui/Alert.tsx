"use client";

import React from 'react';
import { X, AlertCircle, CheckCircle2 } from 'lucide-react';

interface AlertProps {
    type: 'success' | 'error' | 'info';
    message: string;
    onClose?: () => void;
}

const Alert: React.FC<AlertProps> = ({ type, message, onClose }) => {
    const styles = {
        success: 'bg-green-50 border-green-200 text-green-800',
        error: 'bg-red-50 border-red-200 text-red-800',
        info: 'bg-blue-50 border-blue-200 text-blue-800'
    };

    const icons = {
        success: <CheckCircle2 size={20} className="text-green-600" />,
        error: <AlertCircle size={20} className="text-red-600" />,
        info: <AlertCircle size={20} className="text-blue-600" />
    };

    return (
        <div className={`flex items-start gap-3 p-4 rounded-lg border ${styles[type]} mb-4`}>
            {icons[type]}
            <div className="flex-1">
                <p className="text-sm font-medium">{message}</p>
            </div>
            {onClose && (
                <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                    <X size={18} />
                </button>
            )}
        </div>
    );
};

export default Alert;