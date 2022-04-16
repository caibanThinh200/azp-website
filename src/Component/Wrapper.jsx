import clsx from 'clsx'
import { Fragment, useEffect, useState } from 'react'

const Wrapper = (props) => {
    const [dataAos, setDataAos] = useState('');

    useEffect(() => {
        setDataAos(props?.AosAnimation);
    }, [props?.AosAnimation]);

    return (
        <div
            {...props}
            data-aos={dataAos}
            key={props?.key}
            className={clsx(
                props?.className,
                props?.hoverable && 'furniture-wrapper--hover',
                props?.shadow && 'furniture-wrapper--shadow',
                props?.radius && 'furniture-wrapper--radius',
                props?.bordered && 'furniture-wrapper--bordered',
                props?.hasBackground && "furniture-wrapper",

            )}
        >
            {props.children}
        </div>
    )
}

export default Wrapper;
