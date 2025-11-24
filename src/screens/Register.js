import { useCallback, useState } from "react";

import GoodView from "@/components/GoodView";

import useRegister from "@/hooks/useRegister";

import { StyleSheet, View } from "react-native";
import {
	Button,
	Divider,
	Portal,
	Snackbar,
	Text,
	TextInput
} from "react-native-paper";
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

	const [snackVisible, setSnackVisible] = useState(false);
	const [snackStyle, setSnackStyle] = useState();
	const [snackMessage, setSnackMessage] = useState("");

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

	const handleRegister = useCallback(async ({ i, n, e, p }) => {
		const outcome = await register({
			eventId: i,
			name: n,
			email: e,
			phone: p.length ? p : ""
		});

		console.log(outcome);

		if (nameInvalid || emailInvalid || phoneInvalid) {
			outcome = 400;
		}

		switch (outcome) {
			case 201:
				setSnackStyle(snackbarStyles.good);
				setSnackMessage("Registration confirmed! You're good to go!");
				break;
			case 400:
				setSnackStyle(snackbarStyles.bad);
				setSnackMessage(
					"Make sure you've filled out the form correctly, and try again."
				);
				break;
			case 409:
				setSnackStyle(snackbarStyles.bad);
				setSnackMessage(
					"Sorry! There's no more spots available for this event."
				);
				break;
			default:
				setSnackStyle(snackbarStyles.bad);
				setSnackMessage(
					"Something's gone wrong. Please try again later."
				);
				break;
		}

		setSnackVisible(true);
	}, []);

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
							handleRegister({
								i: info.id,
								n: name,
								e: email,
								p: phone
							})
						}
					>
						Confirm Registration
					</Button>
				</View>
				<Portal>
					<Snackbar
						action={{
							label: "Dismiss",
							onPress: () => setSnackVisible(false)
						}}
						style={[
							snackStyle,
							{
								marginBottom: 60,
								borderRadius: 10,
								marginHorizontal: 10
							}
						]}
						visible={snackVisible}
						onDismiss={() => setSnackVisible(false)}
					>
						{snackMessage}
					</Snackbar>
				</Portal>
			</SafeAreaView>
		</GoodView>
	);
}

const snackbarStyles = StyleSheet.create({
	good: { backgroundColor: "#75e78e" },
	bad: { backgroundColor: "#e77575" }
});
