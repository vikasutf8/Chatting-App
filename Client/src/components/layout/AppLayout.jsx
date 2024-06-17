// high ordered component
import React from 'react'
import Header from './Header'
import Title from '../shared/Title'
import { Grid ,Container} from '@mui/material'

const AppLayout = () => (WrappedComponent) => {
    return (props) => {
        return (
            <>
                <Title />
                <Header />

                <Grid Container height={"calc(100vh -4rem)"}>
                    <Grid item xs={4} height={"100%"} >
                        first
                    </Grid>
                    <Grid item xs={4} height={"100%"} bgcolor="primary.main">
                        <WrappedComponent {...props} />
                    </Grid>
                    <Grid item xs={4} height={"100%"}>
                        first
                    </Grid>
                </Grid>

            </>
        )
    }
}

export default AppLayout