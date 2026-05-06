<template>
  <footer id="footer">
    <div class="bg-secondary">
      <div class="upperFooter rowSpaceBetween">
        <NuxtImg src="/images/Logo-Goral-Blanco.svg" alt="Logo Goral" class="logo" width="160" height="35" />
        <ul class="contact column">
          <li v-for="(item, index) in contact" :key="index">
            <a :href="item.link" class="rowCenter text-light font-medium no-underline">
              <Icon :name="`mingcute:${item.icon}`" class="text-light" />
              {{ item.text }}
            </a>
          </li>
        </ul>
      </div>
    </div>
    <div class="bg-secondary certDivider">
      <div class="certBlock">
        <div class="certLogoClaim rowCenter">
          <NuxtImg
            src="/images/home/Logo-Global-GAP.svg"
            alt="GLOBALG.A.P."
            class="certLogo"
            width="64"
            height="64"
          />
          <p class="text-light font-medium">{{ $t('footer.certification.claim') }}</p>
        </div>
        <div class="certMeta rowCenter">
          <button
            type="button"
            @click="copyGgn"
            :aria-label="$t('footer.certification.copy')"
            class="ggnButton rowCenter text-light"
          >
            <span class="text-light/70">{{ $t('footer.certification.ggn') }}</span>
            <span class="ggnNumber">{{ ggn }}</span>
            <Icon
              :name="copied ? 'mingcute:check-line' : 'mingcute:copy-2-line'"
              class="text-light"
            />
            <Transition name="fade">
              <span v-if="copied" class="copiedFeedback text-light">{{ $t('footer.certification.copied') }}</span>
            </Transition>
          </button>
          <span class="separator text-light/40">·</span>
          <p class="text-light">
            <span class="text-light">{{ $t('footer.certification.validity') }}:</span>
            {{ validity }}
          </p>
        </div>
        <div class="certActions column">
          <a
            :href="certificateUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="rowCenter text-light font-medium no-underline certCta"
          >
            {{ $t('footer.certification.cta') }}
            <Icon name="mingcute:external-link-line" class="text-light" />
          </a>
          <a
            href="https://prod.osapiens.cloud/portal/webbundle/foodplus/field-service-os/supply-chain-portal?app-route-hash=%252Fcertificates"
            target="_blank"
            rel="noopener noreferrer"
            class="rowCenter no-underline certVerify"
          >
            {{ $t('footer.certification.verify') }}
            <Icon name="mingcute:external-link-line" />
          </a>
        </div>
      </div>
    </div>
    <div class="bg-dark">
      <div class="rights">
        <p class="text-center text-light">© Goral {{ new Date().getFullYear() }}. {{ $t('footer.rights') }}</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { ref } from 'vue'

const contact = [
  {
    icon: 'mail-line',
    text: 'info@goral.com.ar',
    link: 'mailto:info@goral.com.ar',
  },
]

const ggn = '4069453583276'
const validity = '04/05/2026 – 03/05/2027'
const certificateUrl = '/certificados/globalgap-goral-2026.pdf'
const copied = ref(false)

async function copyGgn() {
  try {
    if (navigator?.clipboard?.writeText) {
      await navigator.clipboard.writeText(ggn)
    } else {
      const textarea = document.createElement('textarea')
      textarea.value = ggn
      textarea.style.position = 'fixed'
      textarea.style.opacity = '0'
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand('copy')
      document.body.removeChild(textarea)
    }
    copied.value = true
    setTimeout(() => { copied.value = false }, 1800)
  } catch (e) {
    console.error('Error copiando GGN', e)
  }
}
</script>

<style scoped>
.upperFooter {
  gap: 0.75rem;
  padding: 1.5rem 1.25rem;
}

.logo {
  width: 5rem;
}

footer ul {
  gap: 0.75rem;
}

footer ul li a {
  font-family: "Urbanist", sans-serif;
}

footer .contact {
  gap: 0.5rem;
}

.contact li a {
  flex-direction: row-reverse;
  gap: 0.375rem;
}

.certDivider {
  border-top: 1px solid rgba(253, 249, 249, 0.12);
}

.certBlock {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  padding: 1.25rem;
  text-align: center;
}

.certLogoClaim {
  gap: 0.625rem;
  flex-direction: column;
}

.certLogo {
  width: 2.75rem;
  height: auto;
  filter: brightness(0) invert(1);
}

.certBlock p,
.certBlock a,
.certBlock button {
  font-size: 0.75rem;
}

.certLogoClaim p {
  letter-spacing: 0.01em;
}

.certMeta {
  flex-direction: column;
  gap: 0.5rem;
  font-size: 0.75rem;
}

.certMeta .separator {
  display: none;
}

.ggnButton {
  position: relative;
  background: transparent;
  border: 1px solid rgba(253, 249, 249, 0.2);
  border-radius: 6px;
  cursor: pointer;
  gap: 0.4rem;
  padding: 0.45rem 0.7rem;
  font-family: "Urbanist", sans-serif;
  font-size: 0.75rem;
}

.ggnNumber {
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  letter-spacing: 0.04em;
}

.copiedFeedback {
  position: absolute;
  top: -1.6rem;
  left: 50%;
  transform: translateX(-50%);
  background-color: var(--dark-color);
  border: 1px solid rgba(253, 249, 249, 0.2);
  border-radius: 4px;
  font-size: 0.75rem;
  white-space: nowrap;
  padding: 0.2rem 0.5rem;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.certActions {
  align-items: center;
  gap: 0.375rem;
  flex-shrink: 0;
}

.certCta {
  gap: 0.375rem;
  font-size: 0.75rem;
  border-bottom: 1px solid rgba(253, 249, 249, 0.4);
  padding-bottom: 0.125rem;
}

.certVerify,
.certVerify :deep(*) {
  color: var(--white-color);
}

.certVerify {
  gap: 0.25rem;
  font-size: 0.6875rem;
  letter-spacing: 0.01em;
  font-family: "Urbanist", sans-serif;
}

.rights {
  padding: 0.5rem;
}

@media (width >=700px) {
  .upperFooter {
    padding: 2.25rem 2.5rem;
  }

  .rights {
    padding: 0.75rem;
  }

  .contact li a {
    gap: 0.75rem;
    font-size: 1.125rem;
  }

  .contact li a span {
    font-size: 1.125rem !important;
  }

  .rights p {
    font-size: 0.875rem;
  }

  .certBlock {
    flex-direction: row;
    justify-content: space-between;
    gap: 1.5rem;
    padding: 1rem 2.5rem;
    text-align: start;
  }

  .certLogoClaim {
    flex-direction: row;
    gap: 0.875rem;
    flex-shrink: 0;
  }

  .certLogo {
    width: 2.5rem;
  }

  .certMeta {
    flex-direction: row;
    flex-wrap: wrap;
    gap: 0.625rem;
    flex: 1;
    justify-content: center;
  }

  .certMeta .separator {
    display: inline;
  }
}

@media (width >=1080px) {
  .upperFooter {
    padding: 2.5rem 5rem;
  }

  .logo {
    width: 7.5rem;
  }

  .rights {
    padding: 1rem;
  }

  .contact li a {
    font-size: 1.25rem;
  }

  .contact li a span {
    font-size: 1.375rem !important;
  }

  .rights p {
    font-size: 1rem;
  }

  .certBlock {
    padding: 1.25rem 5rem;
    gap: 2rem;
  }

  .certBlock p,
  .certBlock a,
  .certBlock button {
    font-size: 0.875rem;
  }

  .certLogo {
    width: 3rem;
  }

  .certMeta {
    gap: 0.875rem;
  }

  .ggnButton {
    padding: 0.5rem 0.85rem;
  }
}

@media (width >=1440px) {
  .upperFooter {
    padding: 3.25rem 5.75rem;
  }

  .logo {
    width: 10rem;
  }

  .rights {
    padding: 1.25rem;
  }

  .contact li a {
    font-size: 1.375rem;
  }

  .contact li a span {
    font-size: 1.5rem !important;
  }

  .certBlock {
    padding: 1.5rem 5.75rem;
  }

  .certLogo {
    width: 3.25rem;
  }
}
</style>
