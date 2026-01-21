import classNames from 'classnames';
import { useTranslation } from 'next-i18next';
import React, { useState } from 'react';
import { StatusMessage } from '@types';

type Props = {
    onSubmit: (name: string) => void;
    statusMessages: StatusMessage[];
};

const ClassroomForm: React.FC<Props> = ({ onSubmit, statusMessages }: Props) => {
    const { t } = useTranslation();
    const [className, setClassName] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmit(className);
    };

    return (
        <div className="max-w-sm m-auto">
            <div>
                <h3 className="px-0">{t('classroom.title')}</h3>
            </div>
            {statusMessages && (
                <div className="row">
                    <ul className="list-none mb-3 mx-auto">
                        {statusMessages.map(({ message, type }, index) => (
                            <li
                                key={index}
                                className={classNames({
                                    'text-red-800': type === 'error',
                                    'text-green-800': type === 'success',
                                })}
                            >
                                {message}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            <form onSubmit={handleSubmit}>
                <div>
                    <div>
                        <label htmlFor="nameInput" className="block mb-2 text-sm font-medium">
                            {t('classroom.label.name')}
                        </label>
                    </div>
                    <div className="block mb-2 text-sm font-medium">
                        <input
                            id="nameInput"
                            type="text"
                            value={className}
                            onChange={(event) => setClassName(event.target.value)}
                            className="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue:500 block w-full p-2.5"
                        />
                    </div>
                </div>

                <div className="row">
                    <button
                        className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                        type="submit"
                    >
                        {t('classroom.button')}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ClassroomForm;