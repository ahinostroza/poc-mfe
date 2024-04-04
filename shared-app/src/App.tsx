import React from 'react'
import ReactDOM from 'react-dom/client'
import ProviderStore from './provider';

const App = () => {
    return (
        <ProviderStore>
            <div className='max-w-6xl mx-auto mt-10 text-3xl text-red-600'>
                <div>Name: Shared</div>
                <div>Framework: React</div>
                <div>Language: TypeScript</div>
            </div>
        </ProviderStore>
    );
};

const root = ReactDOM.createRoot(document.getElementById('app')!)
root.render(<App />)