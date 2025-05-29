<template>
  <v-app>
    <!-- Header -->
    <v-app-bar color="primary" dark>
      <v-app-bar-title>Quotes</v-app-bar-title>
    </v-app-bar>

    <v-main>
      <v-container>
        <!-- Error message -->
        <v-alert v-if="error" type="error" class="mb-4">
          {{ error }}
        </v-alert>

        <!-- Quotes cards -->
        <v-row>
          <v-col v-for="quote in quotes" :key="quote.id" cols="12" sm="6" md="4">
            <v-card>
              <v-card-text>
                {{ quote.quote }}
                <div class="text-caption mt-2">{{ quote.author }}</div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

        <!-- Random quote section -->
        <v-row v-if="!showRandomQuote" justify="center" class="mt-4">
          <v-col cols="12" sm="8" md="6">
            <v-text-field
              v-model="randomPrompt"
              label="Prompt"
              placeholder="Enter a seed word or phrase"
              variant="outlined"
              class="mb-4"
            ></v-text-field>
            <v-btn color="primary" @click="getRandomQuote" block>
              Get Random Quote
            </v-btn>
          </v-col>
        </v-row>

        <!-- Get all quotes button -->
        <v-row v-if="showRandomQuote" justify="center" class="mt-4">
          <v-col cols="12" sm="6" md="4">
            <v-btn color="primary" @click="getAllQuotes" block>
              Get All Quotes
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useQuoteService } from '@/composables/useQuoteService'
import type { Quote } from '@/types/quote'

const quotes = ref<Quote[]>([])
const error = ref<string>('')
const showRandomQuote = ref<boolean>(false)
const randomPrompt = ref<string>('')

const quoteService = useQuoteService()

const getAllQuotes = async () => {
  try {
    showRandomQuote.value = false
    quotes.value = await quoteService.getAllQuotes()
    error.value = ''
  } catch (err) {
    error.value = 'Error fetching quotes. Please try again later.'
    console.error('Error fetching quotes:', err)
  }
}

const getRandomQuote = async () => {
  if (!randomPrompt.value) {
    error.value = 'Please enter a prompt to get a random quote.'
    return
  }
  
  try {
    showRandomQuote.value = true
    const quote = await quoteService.getRandomQuote(randomPrompt.value)
    quotes.value = [quote]
    error.value = ''
  } catch (err) {
    error.value = 'Error fetching random quote. Please try again later.'
    console.error('Error fetching random quote:', err)
  }
}

// Load all quotes on mount
onMounted(() => {
  getAllQuotes()
})
</script>

<style scoped>
.text-caption {
  font-style: italic;
  color: #666;
}
</style>