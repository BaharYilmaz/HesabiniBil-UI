// import React, { useContext } from 'react';
// import { View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
// import { useForm, Controller } from 'react-hook-form'

// import Clipboard from '@react-native-community/clipboard';
// import { Button, Text, Item } from 'native-base';
// import Modal from 'react-native-modal';
// import { AppContext } from '../provider/AppProvider'
// import Toast from 'react-native-simple-toast';


// const MessageModal = () => {

//     const state = useContext(AppContext);
//     const { control, handleSubmit, errors } = useForm();

//     const toggleModal = () => {
//         state.setModal({ modalVisible: false, modalMessage: '' });
//     };

//     const copyToClipboard = (kod) => {
//         Clipboard.setString(kod);
//         Toast.showWithGravity('Davet kodu panoya kopyalandı.', Toast.LONG, Toast.TOP);
//     };

//     const onSubmit = (data) => {
//         toggleModal()
//         console.log(data)
//     }

//     return (
//         <Modal
//             isVisible={state.modal.modalVisible}
//         >
//             <View style={styles.container}>
//                 <View style={styles.modal}>
//                     <View style={styles.modalContainer}>
//                         <View style={styles.modalBody}>
//                             <Text style={styles.bodyText}>{state.modal.modalMessage}</Text>

//                             {state.modal.modalMessageDetail == '' ?
//                                 <View>

//                                     <Item style={{ marginBottom: 15 }}>
//                                         <Controller
//                                             control={control} name="value" defaultValue="" rules={{ required: true }}
//                                             render={({ onChange, value }) => (
//                                                 <View style={{ flexDirection: 'row' }}>
//                                                     <TextInput style={styles.textDetail} onChangeText={value => onChange(value)} value={value} placeholder='Davet kodu giriniz' />
//                                                 </View>
//                                             )}
//                                         />
//                                     </Item>
//                                     {errors.value && <Text style={{ color: 'red', marginLeft: 5 }}>Bu alan boş bırakılamaz !</Text>}

//                                 </View>

//                                 :
//                                 <TouchableOpacity onPress={() => copyToClipboard(state.modal.modalMessageDetail)}>
//                                     <Text style={styles.textDetail}>{state.modal.modalMessageDetail}</Text>
//                                 </TouchableOpacity>
//                             }

//                             <View style={{ marginTop: 15, padding: 10 }}>
//                                 <Button block onPress={handleSubmit(onSubmit)} >
//                                     <Text>{state.modal.modalButton}</Text>
//                                 </Button>
//                             </View>
//                         </View>
//                     </View>
//                 </View>
//             </View>
//         </Modal>
//     );
// };
// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
//     modal: {
//         flex: 1,
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
//     modalContainer: {
//         backgroundColor: "#fff",
//         borderRadius: 5,
//     },
//     modalBody: {
//         backgroundColor: "#fff",
//         paddingVertical: 30,
//         paddingHorizontal: 20,
//         borderRadius: 5
//     },
//     bodyText: {
//         textAlign: 'center'
//     },
//     textDetail: {
//         textAlign: 'center',
//         color: 'gray',
//         marginTop: 10,
//         fontSize: 20,
//     }
// });
// export default MessageModal;