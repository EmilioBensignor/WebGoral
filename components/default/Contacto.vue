<template>
    <aside>
        <Dialog v-model:visible="isDialogVisible" :modal="true" :closable="true" :closeOnEscape="true"
            :dismissableMask="true" @hide="closeDialog">
            <div class="dialogContent column">
                <p class="header">
                    {{ $t('contact.title') }}
                </p>
                <form id="contactForm" class="columnAlignCenter" @submit.prevent="handleSubmit">
                    <div class="formGroup column">
                        <div class="formField column">
                            <label for="name">{{ $t('contact.name.label') }}</label>
                            <input type="text" id="name" v-model="formData.name"
                                :placeholder="$t('contact.name.placeholder')" :class="{ 'error': errors.name }"
                                autocomplete="name">
                            <span class="errorText" v-if="errors.name">{{ errors.name }}</span>
                        </div>
                        <div class="formField column">
                            <label for="email">{{ $t('contact.email.label') }}</label>
                            <input type="email" id="email" v-model="formData.email"
                                :placeholder="$t('contact.email.placeholder')" :class="{ 'error': errors.email }"
                                autocomplete="email">
                            <span class="errorText" v-if="errors.email">{{ errors.email }}</span>
                        </div>
                    </div>
                    <div class="formGroup column">
                        <div class="formField column">
                            <label for="phone">{{ $t('contact.phone.label') }}</label>
                            <div class="phoneField rowCenter">
                                <input type="text" id="phonePrefix" v-model="formData.phonePrefix"
                                    :placeholder="$t('contact.phone.prefix')" autocomplete="tel-country-code">
                                <input type="tel" id="phone" v-model="formData.phone"
                                    :placeholder="$t('contact.phone.placeholder')" :class="{ 'error': errors.phone }"
                                    autocomplete="tel">
                            </div>
                            <span class="errorText" v-if="errors.phone">{{ $t('contact.phone.required') }}</span>
                        </div>
                        <div class="formField column">
                            <label for="message">{{ $t('contact.message.label') }}</label>
                            <textarea id="message" v-model="formData.message"
                                :placeholder="$t('contact.message.placeholder')"
                                :class="{ 'error': errors.message }"></textarea>
                            <span class="errorText" v-if="errors.message">{{ errors.message }}</span>
                        </div>
                    </div>
                    <button type="submit" class="primaryButton" :disabled="isLoading">
                        <span v-if="!isLoading">{{ $t('contact.submit') }}</span>
                        <span v-else class="loader allCenter"></span>
                    </button>
                </form>
            </div>
        </Dialog>

        <Dialog v-model:visible="isSuccessDialogVisible" :modal="true" :closable="true" :closeOnEscape="true"
            :dismissableMask="true" @hide="closeSuccessDialog">
            <div class="dialogContent column">
                <p class="header text-center">{{ $t('contact.success.title') }}</p>
            </div>
            <div class="successDialog">
                <p class="text-center text-light">{{ $t('contact.success.message') }}</p>
            </div>
        </Dialog>
    </aside>
</template>

<script>
export default {
    name: 'ContactDialog',

    data() {
        return {
            isDialogVisible: false,
            isSuccessDialogVisible: false,
            isLoading: false,
            formData: {
                name: '',
                email: '',
                phonePrefix: '',
                phone: '',
                message: ''
            },
            errors: {
                name: '',
                email: '',
                phone: '',
                message: ''
            }
        }
    },

    methods: {
        validateEmail(email) {
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
        },

        validateForm() {
            let isValid = true
            this.errors = {
                name: '',
                email: '',
                phone: '',
                message: ''
            }

            // Validación nombre
            if (!this.formData.name) {
                this.errors.name = this.$t('contact.name.required')
                isValid = false
            } else if (!/^[a-zA-ZÀ-ÿ\s]+$/.test(this.formData.name)) {
                this.errors.name = this.$t('contact.name.onlyText')
                isValid = false
            } else if (this.formData.name.length < 2) {
                this.errors.name = this.$t('contact.name.minLength')
                isValid = false
            } else if (this.formData.name.length > 20) {
                this.errors.name = this.$t('contact.name.maxLength')
                isValid = false
            }

            // Validación email
            if (!this.formData.email) {
                this.errors.email = this.$t('contact.email.required')
                isValid = false
            } else if (!this.validateEmail(this.formData.email)) {
                this.errors.email = this.$t('contact.email.invalid')
                isValid = false
            }

            // Validación teléfono
            if (!this.formData.phone) {
                this.errors.phone = this.$t('contact.phone.required')
                isValid = false
            } else if (!/^\d+$/.test(this.formData.phone)) {
                this.errors.phone = this.$t('contact.phone.onlyNumbers')
                isValid = false
            }

            // Validación mensaje
            if (!this.formData.message) {
                this.errors.message = this.$t('contact.message.required')
                isValid = false
            } else if (this.formData.message.length < 10) {
                this.errors.message = this.$t('contact.message.minLength')
                isValid = false
            } else if (this.formData.message.length > 500) {
                this.errors.message = this.$t('contact.message.maxLength')
                isValid = false
            }

            return isValid
        },

        async handleSubmit() {
            if (this.validateForm()) {
                this.isLoading = true;
                const formattedMessage = `
                    Nombre: ${this.formData.name}
                    Email: ${this.formData.email}
                    Teléfono: ${this.formData.phonePrefix}${this.formData.phone}
                    Mensaje: ${this.formData.message}
                    `;
                try {
                    await $fetch('/api/sendEmail', {
                        method: 'POST',
                        body: {
                            body: formattedMessage
                        }
                    });
                    this.closeDialog();
                    this.showSuccessDialog();
                } catch (error) {
                    console.error('Error al enviar el formulario:', error);
                } finally {
                    this.isLoading = false;
                }
            }
        },

        showSuccessDialog() {
            this.isSuccessDialogVisible = true
        },

        closeSuccessDialog() {
            this.isSuccessDialogVisible = false
        },

        openDialog() {
            this.isDialogVisible = true
        },

        closeDialog() {
            this.isDialogVisible = false
            this.formData = {
                name: '',
                email: '',
                phonePrefix: '',
                phone: '',
                message: ''
            }
            this.errors = {
                name: '',
                email: '',
                phone: '',
                message: ''
            }
        }
    }
}
</script>

<style>
.p-dialog-mask {
    background: rgba(72, 3, 17, 0.3);
}

.p-dialog {
    width: 100%;
    max-width: 280px;
    background: var(--white-color) !important;
    border-radius: 7px !important;
    padding: 3px;
}

.p-dialog-header {
    position: absolute;
    top: 1.25rem;
    right: 1.25rem;
}

.p-dialog-header .p-icon {
    color: var(--secondary-color);
}

@media (width >=660px) {
    .p-dialog {
        max-width: 620px;
        border-radius: 20px !important;
    }

    .p-dialog-header {
        top: 1.5rem;
        right: 1.5rem;
    }

    .p-dialog-header .p-icon {
        width: 1rem;
        height: 1rem;
    }
}

@media (width >=1080px) {
    .p-dialog {
        max-width: 800px;
    }

    .p-dialog-header {
        top: 2rem;
        right: 2rem;
    }

    .p-dialog-header .p-icon {
        width: 1.25rem;
        height: 1.25rem;
    }
}

@media (width >=1440px) {
    .p-dialog {
        max-width: 940px;
    }

    .p-dialog-header {
        top: 2.5rem;
        right: 2.5rem;
    }
}
</style>

<style scoped>
.dialogContent {
    gap: 1.25rem;
    padding: 1rem;
}

.dialogContent .header {
    font-size: 1rem;
    font-family: "Marcellus", serif;
    margin-right: 1rem;
}

form,
.formGroup {
    width: 100%;
    gap: 1rem;
}

.formField {
    gap: 0.25rem;
}

.phoneField {
    gap: 0.25rem;
}

.phoneField input:first-of-type {
    width: 25%;
}

.phoneField input:last-of-type {
    width: 75%;
}

.formField label,
.formField input,
.formField textarea {
    font-size: 0.875rem;
}

.formField input::placeholder,
.formField textarea::placeholder {
    font-size: 0.75rem;
    color: var(--dark-gray-color);
}

.formField input,
.formField textarea {
    border: 1px solid var(--secondary-color);
    border-radius: 7px;
    padding: 0.625rem;
}

.formField input:focus-visible,
.formField textarea:focus-visible {
    outline: none;
}

.formField textarea {
    resize: none;
}

form button {
    width: max-content;
}

.error {
    border-color: var(--primary-color) !important;
}

.errorText {
    color: var(--primary-color);
    font-size: 0.75rem;
    margin-top: 0.25rem;
}

.successDialog {
    background: var(--primary-gradient);
    border-radius: 0 0 7px 7px;
    padding: 1.25rem;
}

.successDialog p {
    font-size: 1rem;
    font-weight: 600;
}

.loader {
    width: 1.25rem;
    height: 1.25rem;
    border: 3px solid #FFF;
    border-bottom-color: transparent;
    border-radius: 50%;
    display: inline-block;
    animation: rotation 1s linear infinite;
}

@keyframes rotation {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}

button:disabled {
    opacity: 0.7;
    cursor: not-allowed;
}

@media (width >=660px) {
    .dialogContent {
        padding: 1.5rem;
    }

    .dialogContent .header {
        font-size: 1.25rem;
    }

    .formGroup {
        flex-direction: row;
        gap: 1rem;
    }

    .formGroup .formField {
        width: 50%;
    }

    .formField label,
    .formField input,
    .formField textarea {
        font-size: 1rem;
    }

    .formField input::placeholder,
    .formField textarea::placeholder {
        font-size: 0.875rem;
    }

    form button {
        align-self: flex-end;
    }

    .successDialog {
        border-radius: 0 0 20px 20px;
        padding: 2rem;
    }
}

@media (width >=1080px) {
    .dialogContent {
        padding: 2rem;
    }

    .dialogContent .header {
        font-size: 1.375rem;
    }

    .phoneField,
    .formField {
        gap: 0.5rem;
    }

    .formField label,
    .formField input,
    .formField textarea {
        font-size: 1.125rem;
    }

    .successDialog p {
        font-size: 1.25rem;
    }
}

@media (width >=1440px) {
    .dialogContent {
        gap: 2rem;
        padding: 2.5rem;
    }

    .dialogContent .header {
        font-size: 1.5rem;
    }

    .formGroup {
        gap: 1.5rem;
    }

    .formField label,
    .formField input,
    .formField textarea {
        font-size: 1.25rem;
    }

    .formField input::placeholder,
    .formField textarea::placeholder {
        font-size: 1rem;
    }

    form button {
        margin-top: 1rem;
    }

    .successDialog p {
        font-size: 1.25rem;
    }
}
</style>