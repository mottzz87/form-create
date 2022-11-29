import getSlot from '@crm-fc/utils/lib/slot';

const NAME = 'vantCheckbox';

export default {
    name: NAME,
    props: {
        formCreateInject: {
            type: Object,
            required: true,
        },
        value: {
            type: Array,
            default: () => []
        },
        type: String,
    },
    watch: {
        'formCreateInject.options': {
            handler() {
                this.update();
            },
            deep: true,
        },
        value() {
            this.update();
        }
    },
    data() {
        return {
            trueValue: []
        }
    },
    methods: {
        options() {
            const opt = this.formCreateInject.options.map(v=> ({...v, name: v.label}));
            return Array.isArray(opt) ? opt : [];
        },
        onInput(n) {
            this.$emit('input', this.options().filter((opt) => n.indexOf(opt.label) !== -1).map((opt) => opt.value).filter(v => v !== undefined));
        },
        update() {
            this.trueValue = this.value ? this.options().filter((opt) => this.value.indexOf(opt.value) !== -1)
                .map((option) => option.label) : []
        }
    },
    created() {
        this.update();
    },
    render() {
        return <van-checkbox-group {...this.formCreateInject.prop} props={{value: this.trueValue}} on-input={this.onInput}>
            {/* {
                this.type === 'unit' ?
                    <van-cell-group>
                        {
                            this.options().map((opt, i) => (
                                <van-cell title={opt.label}
                                    // {...{scopedSlots: {
                                    //     rightIcon: ({prop}) => <van-checkbox name={opt.label} ref="checkboxes" />
                                    // }}}
                                >
                                    <van-checkbox name={opt.label} ref="checkboxes" />
                                </van-cell>
                            ))
                        }
                    </van-cell-group>
                :   this.options().map((opt, index) => {
                        const props = {...opt};
                        delete props.value;
                        return <van-checkbox props={props} key={index + '-' + opt.value}>{opt.label}</van-checkbox>
                    })}{getSlot(this.$slots)
            } */}
            {/* <van-cell-group>
                {
                    this.options().map((opt, i) => (
                        <van-cell title={opt.label}
                            // {...{scopedSlots: {
                            //     rightIcon: ({prop}) => <van-checkbox name={opt.label} ref="checkboxes" />
                            // }}}
                        >
                            <van-checkbox name={opt.label} ref="checkboxes" />
                        </van-cell>
                    ))
                }
            </van-cell-group> */}
            {this.options().map((opt, index) => {
                const props = {...opt};
                const Type = 'van-checkbox';
                delete props.value;
                return <Type props={props} key={Type + index + '-' + opt.value}>{opt.label}</Type>
            })}{getSlot(this.$slots)}
        </van-checkbox-group>
    }
}
