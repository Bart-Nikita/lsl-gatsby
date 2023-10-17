import React, { useEffect, useState } from 'react';
import * as styles from './Loading.module.css'
import { useGlobalContext } from "../../context/context";
import { stack } from "../../hooks/useClassName";

const Loading = ({ className, isLoading }: { className?: string, isLoading: boolean }) => {

    return (
        <div className={stack(styles.heart, !isLoading && styles.disappear, className)} >
            <svg xmlns="http://www.w3.org/2000/svg" className='w-full h-full' width="172" height="158" viewBox="0 0 172 158" fill="none">
                <path d="M86 158C83.3445 157.997 80.7514 157.198 78.5581 155.708C46.0659 133.757 31.9965 118.706 24.2363 109.296C7.6987 89.2371 -0.218666 68.6436 0.0045909 46.3426C0.265058 20.7869 20.8667 0 45.9294 0C64.1539 0 76.7762 10.2165 84.1271 18.7255C84.36 18.9923 84.6477 19.2063 84.9708 19.3529C85.2939 19.4995 85.6449 19.5754 86 19.5754C86.3551 19.5754 86.7061 19.4995 87.0292 19.3529C87.3523 19.2063 87.64 18.9923 87.8729 18.7255C95.2238 10.2083 107.846 0 126.071 0C151.133 0 171.735 20.7869 171.995 46.3467C172.219 68.6518 164.293 89.2453 147.764 109.3C140.003 118.71 125.934 133.761 93.4419 155.712C91.2481 157.201 88.6551 157.998 86 158Z" fill="#FEC955" />
            </svg>
        </div>
    );
};

export default Loading;
