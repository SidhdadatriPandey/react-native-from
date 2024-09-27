import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useMemo, useState } from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { router } from 'expo-router';
import { AntDesign } from '@expo/vector-icons';
import { Dropdown } from 'react-native-element-dropdown';
import CheckBox from 'react-native-check-box';
import RadioGroup from 'react-native-radio-buttons-group';

const index = () => {
    const radioButtonsData = useMemo(() => ([
        {
            id: '1', // acts as primary key, should be unique and non-empty string
            label: 'Option 1',
            value: 'option1'
        },
        {
            id: '2',
            label: 'Option 2',
            value: 'option2'
        },
        {
            id: '3',
            label: 'Option 3',
            value: 'option3'
        },
        {
            id: '4',
            label: 'Option 4',
            value: 'option4'
        }
    ]), []);

    const data = [
        { label: 'Item 1', value: '1' },
        { label: 'Item 2', value: '2' },
        { label: 'Item 3', value: '3' },
        { label: 'Item 4', value: '4' },
        { label: 'Item 5', value: '5' },
        { label: 'Item 6', value: '6' },
        { label: 'Item 7', value: '7' },
        { label: 'Item 8', value: '8' },
    ];

    const [value, setValue] = useState<any>(null);
    const [isFocus, setIsFocus] = useState<boolean>(false);
    const [isChecked, setIsChecked] = useState(false);
    const [radioButtons, setRadioButtons] = useState(radioButtonsData);
    const [selectedId, setSelectedId] = useState<string>(''); // Track selected ID

    const [formData, setFormData] = useState({ fName: "", email: "", phoneNo: "", password: "", item: "", agree: false, option: "" });
    console.log(formData);

    function handleChange(name: string, text: any) {
        setFormData((prevData: any) => {
            return {
                ...prevData,
                [name]: text
            };
        });
        // console.log(formData);
    }

    // Updated function to handle radio button change
    function handleRadioChange(selectedId: string) {
        const selectedButton = radioButtons.find(radio => radio.id === selectedId);
        if (selectedButton) {
            handleChange('option', selectedButton.value);
        }
        setSelectedId(selectedId);
    }

    function pressHandler() {
        console.log('Form Data:', formData);
        alert(`Form Data: \nFull Name: ${formData.fName}\nEmail: ${formData.email}\nPhone No: ${formData.phoneNo}\nPassword: ${formData.password}\nSelected Item: ${formData.item}\nSelected Option: ${formData.option}`);
        router.push('/(tabs)/explore');
    }

    return (
        <View style={{ flex: 1 }}>
            <View style={{ marginTop: hp(10), height: hp(10), flex: 3 }}>
                <TextInput style={style.container} placeholder='Enter full name' onChangeText={(text) => handleChange('fName', text)} />
                <TextInput style={style.container} placeholder='Enter your email' onChangeText={(text) => handleChange('email', text)} />
                <TextInput style={style.container} placeholder='Enter your phone number' onChangeText={(text) => handleChange('phoneNo', text)} />
                <TextInput style={style.container} placeholder='Enter your password' onChangeText={(text) => handleChange('password', text)} />

                <Dropdown
                    style={[style.dropdown, isFocus && { borderColor: 'blue' }]}
                    placeholderStyle={style.placeholderStyle}
                    selectedTextStyle={style.selectedTextStyle}
                    inputSearchStyle={style.inputSearchStyle}
                    iconStyle={style.iconStyle}
                    data={data}
                    search
                    maxHeight={170}
                    labelField="label"
                    valueField="value"
                    placeholder={!isFocus ? 'Select item' : '...'}
                    searchPlaceholder="Search..."
                    value={value}
                    onFocus={() => setIsFocus(true)}
                    onBlur={() => setIsFocus(false)}
                    onChange={item => {
                        setValue(item.value);
                        setIsFocus(false);
                        handleChange('item', item.value);
                    }}
                    renderLeftIcon={() => (
                        <AntDesign
                            style={style.icon}
                            color={isFocus ? 'blue' : 'black'}
                            name="Safety"
                            size={20}
                        />
                    )}
                />

                <CheckBox
                    style={{ flex: 1, padding: 10, paddingHorizontal: hp(2) }}
                    isChecked={formData.agree}
                    onClick={() => handleChange('agree', !formData.agree)}
                    leftText="Agree to terms"
                />

                <RadioGroup
                    radioButtons={radioButtons}
                    onPress={handleRadioChange} // Updated handler to accept selectedId
                    selectedId={selectedId} // Pass selectedId to maintain state
                />

                <TouchableOpacity>
                    <Text style={style.btn} onPress={pressHandler}>Submit</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const style = StyleSheet.create({
    container: {
        fontSize: hp(3),
        borderWidth: 1,
        borderColor: '#000',
        margin: hp(2),
        padding: hp(1)
    },
    btn: {
        borderWidth: 1,
        borderColor: '#000',
        margin: hp(2),
        marginHorizontal: 'auto',
        padding: hp(1),
        backgroundColor: 'yellow',
        marginTop: hp(21)
    },
    dropdown: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: hp(2),
    },
    icon: {
        marginRight: 5,
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 16,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    }
});

export default index;



// import { Text, View, TextInput, Button, StyleSheet } from "react-native";
// import { useForm, Controller } from "react-hook-form";

// export default function App() {
//     const {
//         control,
//         handleSubmit,
//         formState: { errors },
//     } = useForm({
//         defaultValues: {
//             firstName: "",
//             lastName: "",
//             password: ""
//         },
//     });
//     const onSubmit = (data: any) => console.log(data);

//     return (
//         <View style={styles.container}>
//             <Controller
//                 control={control}
//                 rules={{
//                     required: true,
//                 }}
//                 render={({ field: { onChange, onBlur, value } }) => (
//                     <TextInput
//                         style={[styles.input, errors.firstName && styles.inputError]}
//                         placeholder="First name"
//                         onBlur={onBlur}
//                         onChangeText={onChange}
//                         value={value}
//                     />
//                 )}
//                 name="firstName"
//             />
//             {errors.firstName && <Text style={styles.errorText}>First name is required.</Text>}

//             <Controller
//                 control={control}
//                 rules={{
//                     // maxLength: 100,
//                     required: true,
//                 }}
//                 render={({ field: { onChange, onBlur, value } }) => (
//                     <TextInput
//                         style={[styles.input, errors.lastName && styles.inputError]}
//                         placeholder="Last name"
//                         onBlur={onBlur}
//                         onChangeText={onChange}
//                         value={value}
//                     />
//                 )}
//                 name="lastName"
//             />

//             {errors.lastName && (
//                 <Text style={styles.errorText}>Last name must be less than 100 characters.</Text>
//             )}

//             <Controller
//                 control={control}
//                 rules={{
//                     // maxLength: 100,
//                     required: true,
//                 }}
//                 render={({ field: { onChange, onBlur, value } }) => (
//                     <TextInput
//                         style={[styles.input, errors.password && styles.inputError]}
//                         placeholder="Password"
//                         onBlur={onBlur}
//                         onChangeText={onChange}
//                         value={value}
//                         secureTextEntry={true}
//                     />
//                 )}
//                 name="password"
//             />

//             {errors.password && (
//                 <Text style={styles.errorText}>Please fill password.</Text>
//             )}

//             <Button title="Submit" onPress={handleSubmit(onSubmit)} />
//         </View>
//     );
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: "center",
//         alignItems: "center",
//         padding: 20,
//         backgroundColor: "#f5f5f5",
//     },
//     input: {
//         width: "100%",
//         padding: 10,
//         borderWidth: 1,
//         borderColor: "#ccc",
//         borderRadius: 5,
//         marginBottom: 10,
//         backgroundColor: "#fff",
//     },
//     inputError: {
//         borderColor: "red",
//     },
//     errorText: {
//         color: "red",
//         alignSelf: "flex-start",
//         marginBottom: 10,
//     }
// })
