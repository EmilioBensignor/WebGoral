<template>
    <aside>
        <!-- Contact Modal -->
        <div v-if="isDialogVisible" class="modal-overlay" @click="closeDialog">
            <div class="modal-content" role="dialog" aria-modal="true" aria-labelledby="contactDialogTitle"
                ref="dialogEl" @click.stop @keydown="handleFocusTrap">
                <button @click="closeDialog" class="modal-close" :aria-label="$t('a11y.close')">
                    <Icon name="mingcute:close-line" />
                </button>
                <div class="dialogContent column">
                    <h2 id="contactDialogTitle" class="header">
                        {{ $t('contact.title') }}
                    </h2>
                    <form id="contactForm" class="columnAlignCenter" @submit.prevent="handleSubmit">
                        <!-- Honeypot anti-spam (no debe verse ni ser tabulado) -->
                        <div class="honeypot" aria-hidden="true">
                            <label for="website">Website</label>
                            <input type="text" id="website" name="website" v-model="formData.website"
                                tabindex="-1" autocomplete="off" />
                        </div>
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
            </div>
        </div>

        <!-- Success Modal -->
        <div v-if="isSuccessDialogVisible" class="modal-overlay" @click="closeSuccessDialog">
            <div class="modal-content" role="dialog" aria-modal="true" aria-labelledby="successDialogTitle"
                @click.stop>
                <button @click="closeSuccessDialog" class="modal-close" :aria-label="$t('a11y.close')">
                    <Icon name="mingcute:close-line" />
                </button>
                <div class="dialogContent column">
                    <h2 id="successDialogTitle" class="header text-center">{{ $t('contact.success.title') }}</h2>
                </div>
                <div class="successDialog">
                    <p class="text-center text-light">{{ $t('contact.success.message') }}</p>
                </div>
            </div>
        </div>
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
            previousFocus: null,
            formData: {
                name: '',
                email: '',
                phonePrefix: '',
                phone: '',
                message: '',
                website: '' // honeypot
            },
            errors: {
                name: '',
                email: '',
                phone: '',
                message: ''
            }
        }
    },

    mounted() {
        document.addEventListener('keydown', this.handleKeyDown)
    },

    beforeUnmount() {
        document.removeEventListener('keydown', this.handleKeyDown)
    },

    methods: {
        handleKeyDown(event) {
            if (event.key === 'Escape') {
                if (this.isDialogVisible) {
                    this.closeDialog()
                } else if (this.isSuccessDialogVisible) {
                    this.closeSuccessDialog()
                }
            }
        },

        handleFocusTrap(event) {
            if (event.key !== 'Tab') return
            const dialog = this.$refs.dialogEl
            if (!dialog) return
            const focusable = dialog.querySelectorAll(
                'button, [href], input, textarea, select, [tabindex]:not([tabindex="-1"])'
            )
            if (focusable.length === 0) return
            const first = focusable[0]
            const last = focusable[focusable.length - 1]
            if (event.shiftKey && document.activeElement === first) {
                event.preventDefault()
                last.focus()
            } else if (!event.shiftKey && document.activeElement === last) {
                event.preventDefault()
                first.focus()
            }
        },

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

            if (!this.formData.email) {
                this.errors.email = this.$t('contact.email.required')
                isValid = false
            } else if (!this.validateEmail(this.formData.email)) {
                this.errors.email = this.$t('contact.email.invalid')
                isValid = false
            }

            if (!this.formData.phone) {
                this.errors.phone = this.$t('contact.phone.required')
                isValid = false
            } else if (!/^\d+$/.test(this.formData.phone)) {
                this.errors.phone = this.$t('contact.phone.onlyNumbers')
                isValid = false
            }

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
                            body: formattedMessage,
                            website: this.formData.website // honeypot
                        }
                    });
                    this.closeDialog();
                    this.showSuccessDialog();
                } catch (error) {
                    if (import.meta.dev) {
                        console.error('Error al enviar el formulario:', error);
                    }
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
            this.restoreFocus()
        },

        openDialog() {
            if (typeof document !== 'undefined') {
                this.previousFocus = document.activeElement
            }
            this.isDialogVisible = true
            this.$nextTick(() => {
                const dialog = this.$refs.dialogEl
                const firstInput = dialog?.querySelector('input, textarea, button')
                firstInput?.focus()
            })
        },

        closeDialog() {
            this.isDialogVisible = false
            this.formData = {
                name: '',
                email: '',
                phonePrefix: '',
                phone: '',
                message: '',
                website: ''
            }
            this.errors = {
                name: '',
                email: '',
                phone: '',
                message: ''
            }
            this.restoreFocus()
        },

        restoreFocus() {
            if (this.previousFocus && typeof this.previousFocus.focus === 'function') {
                this.previousFocus.focus()
                this.previousFocus = null
            }
        }
    }
}
</script>

<style>
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(72, 3, 17, 0.3);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
}

.modal-content {
    width: 100%;
    max-width: 280px;
    background: var(--white-color);
    border-radius: 7px;
    padding: 3px;
    position: relative;
    max-height: 90vh;
    overflow-y: auto;
}

.modal-close {
    position: absolute;
    top: 1.25rem;
    right: 1.25rem;
    background: none;
    border: none;
    cursor: pointer;
    color: var(--secondary-color);
    z-index: 1;
}

@media (width >=660px) {
    .modal-content {
        max-width: 620px;
        border-radius: 20px;
    }

    .modal-close {
        top: 1.5rem;
        right: 1.5rem;
    }

    .modal-close span {
        width: 1rem;
        height: 1rem;
    }
}

@media (width >=1080px) {
    .modal-content {
        max-width: 800px;
    }

    .modal-close {
        top: 2rem;
        right: 2rem;
    }

    .modal-close span {
        width: 1.25rem;
        height: 1.25rem;
    }
}

@media (width >=1440px) {
    .modal-content {
        max-width: 940px;
    }

    .modal-close {
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
    font-family: "Urbanist", sans-serif;
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

.honeypot {
    position: absolute;
    left: -10000px;
    top: auto;
    width: 1px;
    height: 1px;
    overflow: hidden;
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