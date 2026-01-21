import Head from 'next/head';
import Header from '@components/header';
import ClassroomForm from '@components/classrooms/ClassroomForm';
import ClassroomService from '@services/ClassroomService';
import { StatusMessage, User } from '@types';
import { useEffect, useState } from 'react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const Classrooms: React.FC = () => {
    const { t } = useTranslation();
    const [loggedInUser, setLoggedInUser] = useState<User>(null);
    const [statusMessages, setStatusMessages] = useState<StatusMessage[]>([]);

    useEffect(() => {
        setLoggedInUser(JSON.parse(sessionStorage.getItem('loggedInUser')));
    }, []);

    const handleSubmit = async (className: string) => {
        setStatusMessages([]);

        const response = await ClassroomService.createClassroom(className);

        if (response.ok) {
            const classroom = await response.json();
            setStatusMessages([
                {
                    message: t('classroom.success', { 
                    className: classroom.className, 
                    id: classroom.id 
                    }),
                    type: 'success',
                },
            ]);
        } else if (response.status === 400) {
        const error = await response.json();
        
        const isDuplicate = error.message?.includes('already exists'); 
        
        setStatusMessages([
            {
                message: isDuplicate 
                    ? t('classroom.duplicate', { className })
                    : t('classroom.validate.name'),
                type: 'error',
            },
        ]);
        } else {
            setStatusMessages([
                {
                message: t('general.error'),
                type: 'error',
                },
            ]);
        }
    };

    if (!loggedInUser || loggedInUser.role !== 'admin') {
        return (
            <>
                <Head>
                    <title>{t('classroom.title')}</title>
                </Head>
                <Header />
                <main>
                    <div className="text-red-800">
                        {t('classroom.unauthorized')}
                    </div>
                </main>
            </>
        );
    }

    return (
        <>
            <Head>
                <title>{t('classroom.title')}</title>
            </Head>
            <Header />
            <main>
                <ClassroomForm onSubmit={handleSubmit} statusMessages={statusMessages} />
            </main>
        </>
    );
};

export const getServerSideProps = async (context) => {
    const { locale } = context;
    return {
        props: {
            ...(await serverSideTranslations(locale ?? 'en', ['common'])),
        },
    };
};

export default Classrooms;