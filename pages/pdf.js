import Head from 'next/head'
import Script from 'next/script'
import styles from '../styles/Pdf.module.css'
import { useRef } from 'react'
import axios from 'axios'
import download from 'downloadjs'

export default function PDF() {
    let sourceUrl = useRef(null);

    const onUrlSubmit = async (e) => {
        try {
            const url = sourceUrl.current.value;

            const res = await axios.post(
                '/api/pdf/fromurl',
                { html_url: url },
                { 
                    headers: { 'Content-Type': 'application/json' },
                    responseType: 'blob'
                }
            );
            
            const contDisposition = res.headers.get("Content-disposition");
            const filename = contDisposition.substring(contDisposition.indexOf("=") + 1);

            download(
                new Blob([res.data], { type: 'application/pdf' }),
                filename);
            
        } catch (error) {
            console.error(error)
        }
    }

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
                        <input ref={sourceUrl} type="text" />
                    </div>
                    <button onClick={onUrlSubmit} className='text-center mx-auto'>Download</button>
                </div>
            </main>
        </div>
    )
}