import {
	MD3LightTheme as DefaultTheme,
	PaperProvider,
} from "react-native-paper";

import * as col from "./colors.json";

const theme = {
	...DefaultTheme,
	colors: col.colors,
};

export default theme;
