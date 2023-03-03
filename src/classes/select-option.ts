import { DisplayOptions } from "../enums/display-options";

export class SelectOption {
	label: string;
	value: DisplayOptions;

	constructor(label: string, value: DisplayOptions) {
		this.label = label;
		this.value = value;
	}
}