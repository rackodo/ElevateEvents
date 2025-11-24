import { useState } from "react";

import GoodView from "@/components/GoodView";

import useRegister from "@/hooks/useRegister";

import { View } from "react-native";
import { Button, Divider, Text, TextInput } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Register({ route }) {
	const { info } = route.params;

	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");

	const [nameInvalid, setNameInvalid] = useState(false);
	const [emailInvalid, setEmailInvalid] = useState(false);
	const [phoneInvalid, setPhoneInvalid] = useState(false);

	const { register } = useRegister();

	const validateName = (testName) => {
		setName(testName);

		if (typeof testName == "string") {
			setNameInvalid(false);
		} else {
			setNameInvalid(true);
		}
	};

	const validateEmail = (testEmail) => {
		setEmail(testEmail);

		if (/.+@.+\../.test(testEmail)) {
			setEmailInvalid(false);
		} else {
			setEmailInvalid(true);
		}
	};

	const validatePhone = (testPhone) => {
		setPhone(testPhone);

		if (
			testPhone.replace(/\D/g, "").length == 10 ||
			testPhone.length == 0
		) {
			setPhoneInvalid(false);
		} else {
			setPhoneInvalid(true);
		}
	};

	return (
		<GoodView>
			<SafeAreaView style={{ padding: 10, gap: 10, flex: 1 }}>
				<Text variant="headlineMedium" style={{ fontWeight: "bold" }}>
					{info.title.replace(" REMOTE", "")}
				</Text>
				<Divider />
				<TextInput
					error={nameInvalid}
					value={name}
					onChangeText={(text) => validateName(text)}
					mode="outlined"
					label="Name (Required)"
				/>
				<TextInput
					error={emailInvalid}
					value={email}
					onChangeText={(text) => validateEmail(text)}
					mode="outlined"
					label="Email (Required)"
				/>
				<TextInput
					error={phoneInvalid}
					value={phone}
					onChangeText={(text) => validatePhone(text)}
					mode="outlined"
					label="Phone (Optional)"
				/>
				<View style={{ justifyContent: "flex-end", flex: 1 }}>
					<Button
						mode="contained"
						style={{ borderRadius: 10 }}
						onPress={() =>
							register({
								eventId: info.id,
								name: name,
								email: email,
								phone: phone.length ? phone : ""
							})
						}
					>
						Confirm Registration
					</Button>
				</View>
			</SafeAreaView>
		</GoodView>
	);
}
