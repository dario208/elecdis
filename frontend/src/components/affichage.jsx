

import { BarChart } from '@mui/x-charts/BarChart';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { LineChart } from '@mui/x-charts/LineChart';
import MixedChart from './components/mixtChart';
import BasicComposition from './Basic';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

const affichage = () => {
    return (
        <div>
            <div>
                <BarChart
                    series={[
                        { data: [35, 44, 24, 34] },
                        { data: [51, 6, 49, 30] },
                        { data: [15, 25, 30, 50] },
                        { data: [60, 50, 15, 25] },
                    ]}
                    height={290}
                    xAxis={[{ data: ['Q1', 'Q2', 'Q3', 'Q4'], scaleType: 'band' }]}
                    margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
                />

                <LineChart
                    xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
                    series={[
                        {
                            data: [2, 5.5, 2, 8.5, 1.5, 5],
                        },
                    ]}
                    height={300}
                    margin={{ left: 30, right: 30, top: 30, bottom: 30 }}
                    grid={{ vertical: true, horizontal: true }}
                />
            </div>
            <div>
                <Box
                    component="form" sx={{ '& > :not(style)': { m: 1, width: '25ch' }, }}
                    noValidate
                    autoComplete="off"
                >
                    <TextField id="outlined-basic" label="Outlined" variant="outlined" />
                    <TextField id="filled-basic" label="Filled" variant="filled" />
                    <TextField id="standard-basic" label="Standard" variant="standard" />
                </Box>
            </div>

            <div className=' h-[50vh] flex justify-center'>
                <MixedChart />
            </div>

            <div className=' h-[50vh] flex justify-around'>

                <Card variant="outlined" sx={{ maxWidth: 360 }}>
                    <Box sx={{ p: 2 }}>
                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                            <Typography gutterBottom variant="h5" component="div">
                                Toothbrush
                            </Typography>
                            <Typography gutterBottom variant="h6" component="div">
                                $4.50
                            </Typography>
                        </Stack>
                        <Typography color="text.secondary" variant="body2">
                            Pinstriped cornflower blue cotton blouse takes you on a walk to the park or
                            just down the hall.
                        </Typography>
                    </Box>
                    <Divider />
                    <Box sx={{ p: 2 }}>
                        <Typography gutterBottom variant="body2">
                            Select type
                        </Typography>
                        <Stack direction="row" spacing={1}>
                            <Chip color="primary" label="Soft" size="small" />
                            <Chip label="Medium" size="small" />
                            <Chip label="Hard" size="small" />
                        </Stack>
                    </Box>
                </Card>  <Card variant="outlined" sx={{ maxWidth: 360 }}>
                    <Box sx={{ p: 2 }}>
                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                            <Typography gutterBottom variant="h5" component="div">
                                Toothbrush
                            </Typography>
                            <Typography gutterBottom variant="h6" component="div">
                                $4.50
                            </Typography>
                        </Stack>
                        <Typography color="text.secondary" variant="body2">
                            Pinstriped cornflower blue cotton blouse takes you on a walk to the park or
                            just down the hall.
                        </Typography>
                    </Box>
                    <Divider />
                    <Box sx={{ p: 2 }}>
                        <Typography gutterBottom variant="body2">
                            Select type
                        </Typography>
                        <Stack direction="row" spacing={1}>
                            <Chip color="primary" label="Soft" size="small" />
                            <Chip label="Medium" size="small" />
                            <Chip label="Hard" size="small" />
                        </Stack>
                    </Box>
                </Card>

            </div>
            <BasicComposition />
        </div>
    )
}

export default affichage