import { Box, Card, Typography } from "@mui/material";
import { useEffect } from "react";


export function ListData(props: any) {
    const{listData} = props
    useEffect(()=>{
    },[])

return (
<>
                                                
                                                        <Box sx={{
                                                            transition: 'all 0.5s ease',
                                                            width: listData.length == 0 ? '0%' : '50%',
                                                            display: 'grid',
                                                            gridTemplateColumns: 'repeat(2, 5fr)',
                                                            justifyContent: 'center',
                                                            alignItems: 'top',
                                                            backgroundColor: 'lightgray',
                                                            borderRadius: '5px',
                                                            gap: listData.length == 0 ? '0px':'7px',
                                                            p: listData.length == 0 ? 0 : 1
                                                        }}>
                                                            {listData.map((data: any) => {

                                                                
                                                                return (

                                                                    <Card  sx={{
                                                                        transition: 'width 0.5s ease',
                                                                        height: '27px',
                                                                        backgroundColor: 'blue',
                                                                        borderRadius: '15px',
                                                                        overflow: 'hidden',
                                                                        border: '1px solid black'
                                                                    }}>
                                                                        <Box sx={{
                                                                            transition: 'width 0.5s ease',
                                                                           
                                                                            display: 'grid',
                                                                            gridTemplateColumns: 'repeat(2, 5fr)',
                                                                            justifyContent: 'center',
                                                                            alignItems: 'center',
                                                                            backgroundColor: 'gray',
                                                                            borderRadius: '5px',
                                                                            
                                                                        }}>

                                                                            <Box sx={{
                                                                                transition: 'width 0.5s ease',
                                                                                width: '100%',
                                                                                height: '25px',
                                                                                backgroundColor: data.selected_status == 1 ? '#53b06c' : 'white',
                                                                                color: 'black',
                                                                                display:"flex",
                                                                                justifyContent:"center",
                                                                                alignContent:'center',
                                                                                alignItems:'center'
                                                                            }}>
                                                                                <Typography variant="subtitle2" sx={{fontSize:'13px', fontWeight:'500', m: 1, textAlign:'center'}}>Código: {data.code}</Typography>
                                                                            </Box>
                                                                            <Box sx={{
                                                                                transition: 'width 0.5s ease',
                                                                                width: '100%',
                                                                                height: '25px',
                                                                                backgroundColor: 'gray',
                                                                                display:"flex",
                                                                                justifyContent:"center",
                                                                                alignContent:'center',
                                                                                alignItems:'center'
                                                                               
                                                                            }}>
                                                                                <Typography variant="subtitle2" sx={{fontSize:'11px',fontWeight:'bold', m: 1, textAlign:'center'}}>{data.titulo}</Typography>
                                                                            </Box>
                                                                        </Box>


                                                                    </Card >

                                                                );
                                                            })}
                                                        </Box>




</>
);
}