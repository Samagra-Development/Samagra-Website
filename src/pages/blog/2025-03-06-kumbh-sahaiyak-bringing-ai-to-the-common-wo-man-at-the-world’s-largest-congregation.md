---
templateKey: blog-post
title: "Kumbh Sah'AI'yak: Bringing AI to the Common (Wo)man at the World’s
  Largest Congregation"
author: Simran Bagga and Amit Gupta
projectId: Kumbh Sah'AI'yak
authorImage: /img/person-vector.jpeg
date: 2025-03-06T07:03:20.652Z
description: Artificial Intelligence (AI) has emerged as the defining disruptor
  of our times — lowering costs, scaling solutions, and transforming industries
  worldwide.
featuredimage: /img/kumbh.png
---
Artificial Intelligence (AI) has emerged as the defining disruptor of our times — lowering costs, scaling solutions, and transforming industries worldwide. AI adoption is skyrocketing across healthcare, finance, and public services with reduction in operational costs for businesses and AI-powered customer service bots handling a significant chunk of interactions without human intervention. For example, an [IBM report](https://www.ibm.com/think/topics/chatbot-use-cases#:~:text=The%20wide%20array%20of%20chatbots,and%20improving%20response%20times%20significantly.) shares a case study on how businesses have been able to deploy chatbots which can resolve up to 80% of routine customer inquiries, significantly improving efficiency. Countries are integrating AI into governance, education, and citizen services, demonstrating its far-reaching impact. From real-time language translation to autonomous operations, the use cases continue to expand. 

However, the true challenge lies in ensuring AI benefits all sections of society. If AI is truly ubiquitous, why not use it to solve real-world problems for the common (wo)man? Why not democratize AI’s benefits to those who need them the most? This very thought led to the creation of [Kumbh Sah'AI'yak](https://www.youtube.com/watch?v=mAnlGzlvPoA)—an AI-driven chatbot designed to assist crores of visitors navigating the world’s largest religious gathering, the Mahakumbh Mela which happened in Prayagraj from 13th January to 26th February 2025.

Samagra had already pioneered [Bharat Sah'AI'yak](https://www.youtube.com/watch?v=xUUvAC-sIwM), a platform designed to develop, deploy, and manage AI solutions, including AI-enabled chatbots. The success of these initiatives showcased the potential of AI to drive large-scale citizen impact.

![](/img/kumbh-p1.png)

*Fig: Bharat Sah'AI'yak has been used to create multiple AI chatbots*

With the Kumbh Mela in sight, Samagra, with support from the Gates Foundation, brought together leading ecosystem players to co-create Kumbh Sah'AI'yak by leveraging the best of the ecosystem. The Prayagraj Mela Authority, responsible for conducting the Mela, and UPDESCO, UP’s nodal agency for IT and ITeS services, collaborated to shape the chatbot’s deployment. Ola Group’s Krutrim provided hosted Large Language Model (LLM) infrastructure for open-source models, while the Government of India’s Bhashini enhanced multilingual capabilities. This strategic convergence ensured a robust, scalable chatbot tailored to the diverse needs of Kumbh pilgrims.

### Building for the Kumbh

The Kumbh Mela hosted more than 65 crore visitors from India and around the world. While this presented an unparalleled opportunity to use AI for the benefit of the common citizen, it also posed significant challenges. The chatbot needed to be religiously sensitive, ensuring all responses were respectful and aligned with the sentiments of the pilgrims. Accuracy was paramount—any misinformation could lead to confusion or even disruptions in the event’s operations. Hence, developing an AI chatbot for Kumbh Mela wasn’t just about repurposing existing models. It required deep customization to address these unique challenges.

To ensure ease of access for diverse user cohorts, the chatbot was made available via two channels—WhatsApp and a web app accessible from the official Kumbh website and app. It was also decided that the app would be made available in English, Hindi, and nine other Indian languages to cater to a culturally and linguistically diverse user group. 

![](/img/kumbh-p2.png)

*Fig: Kumbh Sah'AI'yak was available in 11 languages*

To improve accuracy and user experience, the chatbot was designed to provide a Guided Experience—a mix of menu-driven options and open-ended questions. Menu options helped reduce LLM-only responses, ensuring more reliable and structured interactions, while open-ended questions allowed the chatbot to better tailor responses to visitor needs.

![](/img/kumbh-p3.png)

*Fig: Preset list of options to help users access answers to popular queries*

To ensure the chatbot provided the most accurate and relevant information, Kumbh Sah'AI'yak leveraged a [Retrieval-Augmented Generation (RAG) model](https://aws.amazon.com/what-is/retrieval-augmented-generation/) - an AI framework that Instead of relying solely on pre-trained knowledge, retrieves relevant data from an external knowledge base (such as a database or documents) and then generates responses using a language model. This approach allowed the chatbot to retrieve precise responses from a bespoke knowledge repository before generating a response, improving factual accuracy and contextual relevance.

The knowledge repository used to train the RAG model was specially curated for Kumbh Sah'AI'yak. It consisted of over 6 lakh words of meticulously compiled data, covering a wide range of topics essential for Kumbh pilgrims, including:

* History and Rituals of Kumbh Mela: Detailed explanations of its origins, significance, and religious ceremonies.
* Key Attractions in Mela Area and Prayagraj: Information on important sites within and around the Mela area.
* Tours and Packages: Various pilgrimage packages available for visitors to attend the event.
* Travel and Stay Arrangements: Accommodation options, transportation modes, and accessibility details for pilgrims traveling to Prayagraj.
* Facilities and Amenities: Government-provided services such as medical aid, food distribution centers, sanitation facilities, and emergency arrangements.

![](/img/kumbh-p4.png)

*Fig: Knowledge Repository used to train the RAG model*

By leveraging this comprehensive dataset, the chatbot was able to answer queries with high precision, ensuring pilgrims had access to the most up-to-date and relevant information at all times.

To further enhance accuracy and mitigate AI hallucinations, all information in the knowledge repository was structured as Q&A pairs, ensuring that the chatbot strictly responded within the predefined FAQ framework. This ring-fencing approach prevented misinformation and maintained high response reliability. Additionally, an automated test bed was developed to facilitate iterative testing and quality improvements, allowing for continuous refinement of responses based on real-world interactions.

### Profanity Safeguards

Profanity checks were put in place to guard the chatbot against profane and socially or religiously insensitive queries. 

A flag was implemented as part of Bhashini’s translation services bundle on the request of the Kumbh Sah'AI'yak team. It indicates the presence of profanity, thereby allowing the system to terminate the process of finding an answer to the user’s query. In case profanity was detected, a templated response was sent to the user by the bot. Bhashini’s profanity filter was augmented specifically in the context of Kumbh to include religious as well as politically sensitive profane words and phrases.

While the Bhashini profanity filter performed a keyword-based search to identify profane words/phrases, Amazon Guardrails performed a semantic search and tagged any profane question as “Unsafe”. In this case, too, if profanity was detected, the system terminated the process of finding an answer to the user’s query and a templated response was sent to the user by the bot.

All queries identified as non-profane by Bhashini and Amazon Guardrails were also then screened by the LLM as the last and final check for profanity identification.

Overall, this 3-step profanity elimination system worked well, and no cases of profanity came to the fore.

### Language Services

A chatbot that serves pilgrims from across India needed to support multiple languages with speech capabilities.

* Language Customization: All content in the knowledge repository was translated into all 11 languages supported by the chatbot. To ensure the accuracy of religiously sensitive content, a Hindi-first approach was taken for such content, followed by translations into English and nine other Indian languages.
* Kumbh-Specific Glossary: A Kumbh-specific glossary was implemented as part of Bhashini’s translation services bundle, preventing 500+ Kumbh-related proper nouns from being semantically translated (e.g., “Shahi Snan” in a Hindi query did not get translated to “Royal Bath” when sent to Bhashini for English translation).
* Alias Mapping for User Queries: Since users tend to refer to one specific entity in multiple ways, a list of 100+ alias pairs was implemented to enable mapping of the user’s query articulation to the articulation present in the information database. For example, “Pandits” and “Pandas” are aliases. If the database referred to them as “Pandits” while the user queried about “Pandas,” the bot recognized the term and delivered accurate answers.
* Text-to-Speech Enhancements: Bhashini's text-to-speech model was augmented with the correct pronunciations of 250+ words to improve the chatbot’s spoken responses.

### Reaching the common man: Kumbh Sah'AI'yak’s Impact

The chatbot was officially launched by Prime Minister Narendra Modi on 13th December, 2024 in a public event in Prayagraj. 

![](/img/kumbh-p5.png)

*Fig: Hon’ble Prime Minister Shri Narendra Modi launching Kumbh Sah'AI'yak on December 13, 2024*

Post the launch, extensive branding campaigns were undertaken to make pilgrims and prospective Kumbh visitors aware of the chatbot. Kumbh Sah'AI'yak was integrated across major branding channels—official app and website, social media, and on-ground publicity material —to maximise reach and usability.

![](/img/kumbh-p6.png)

*Fig: Diverse digital & physical channels mediums used for the promotion of the chatbot*

As a result, Kumbh Sah'AI'yak was used by more than 3 Lakh pilgrims before and during the Mela. 

![](/img/kumbh-p7.png)

Travel and stay came out as the largest used use case and English and Hindi followed by Gujarati came out as the most used languages by the chatbot users.

![](/img/kumbh-p8.png)

*Fig: Share of users based on (a) Use Case Wise (b) Language Wise*

### Learnings from Kumbh Sah'AI'yak

The experience with Kumbh Sah'AI'yak provides several valuable insights that can inform the development of tech products in general and AI chatbots in particular.

* Login and Privacy Concerns: Requiring users to log in on web app created friction, particularly among tech-savvy users who were hesitant to share their phone numbers.
* User Expectation for Free-Flowing Conversations: Pilgrims expected the chatbot to handle unstructured, conversational queries rather than predefined menu-driven interactions.
* Variation in Query Articulation: Users articulated their questions in multiple ways, with Hindi users generally adopting a more formal tone compared to English users.
* Balancing Hallucinations with Answer Quality: A critical tradeoff emerged—strictly limiting hallucinations sometimes resulted in incomplete answers, while allowing more flexibility improved responses but increased the risk of misinformation.

Language services like Translation, Speech-to-Text (S2T), and Text-to-Speech (T2S) technologies are essential for providing multilingual and accessible services, especially in a diverse and multilingual country like India. However, language models need to be tailored to handle the linguistic diversity of India. 

* The chatbot’s performance in local dialects and regional languages showed that generic AI models often struggled to capture the nuances of these languages. Similarly, speech-to-text models (e.g., Bhashini) faced issues with pronunciation variations and accent diversity.
* Speech-to-text often led to incorrect transcriptions or misinterpretations of user queries, which in turn affected the chatbot’s ability to respond accurately. In some cases, transcription errors led to contextual misunderstandings.

Kumbh Sah'AI'yak is a proof of concept for how AI can address India-specific challenges at scale, enhancing governance and service delivery. But for AI to be truly transformative, it must be deeply rooted in Indian languages and real-world contexts.

Achieving this requires that India accelerates the development of indigenous AI models—both large and small language models tailored for Indian languages and cultural contexts. Building high-quality datasets in Indian languages is essential to train these models effectively. Finally, grassroots adoption will hinge on improving digital literacy, particularly in rural areas, to ensure AI solutions are accessible to all.

While AI in public services holds immense promise, its widespread impact will depend on collaborative efforts between the government, tech industry, and civil society to build ethical, inclusive, and adaptable AI solutions. As India moves forward in its digital transformation, AI can become a cornerstone for efficient, responsive, and citizen-centric governance, unlocking new opportunities for innovation and scalability in the public sector.