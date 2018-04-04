import React from 'react'
import {CopperLoading} from 'respinner'

export class Loader extends React.Component {
    render() {
        return (
            <div className={'col-xs text-center'}>
                <CopperLoading size={80} strokeWidth={3} fill="#ff6600"/>
                <h4>Loading....</h4>
            </div>
        )

    }
}