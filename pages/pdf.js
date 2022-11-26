import Head from 'next/head'
import Script from 'next/script'
import styles from '../styles/Pdf.module.css'


export default function PDF() {
    return (
        <div className={styles.container}>
            <Head>
                <title>HTML to PDF</title>
            </Head>

            <main className={styles.main}>
                <h1 className={[styles.title, "mb-16"].join(' ')}>
                    HTML to PDF
                </h1>

                <div className='url-area mb-16 flex flex-col'>
                    <div>
                        <h3 className='text-center text-3xl font-light'>GET FROM URL</h3>
                        <input type="text" />
                    </div>
                    <button className='text-center mx-auto'>Download</button>
                </div>
            </main>
        </div>
    )
}