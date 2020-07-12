import {AppText} from "./text";
import colors from "./colors";

const slides = [
    {
        key: 'one',
        title: AppText.we_motivate_you_to_start_something_big,
        text: AppText.preach_write_act_slide_1,
        image: require('../assets/app_images/start_now.jpg'),
        backgroundColor: '#59b2ab',
    },
    {
        key: 'two',
        title: AppText.we_help_you_during_your_journey,
        text: AppText.keep_running_description,
        image: require('../assets/app_images/keep_running.jpg'),
        backgroundColor: '#febe29',
    },
    {
        key: 'three',
        title: AppText.we_build_your_imagination_how_to_think_good,
        text: AppText.believe_it_can_be_done_description,
        image: require('../assets/app_images/today_good_day.jpg'),
        backgroundColor: colors.emerald,
    }
];

export default slides;
