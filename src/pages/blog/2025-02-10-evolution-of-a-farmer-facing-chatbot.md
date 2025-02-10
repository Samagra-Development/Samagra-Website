---
templateKey: blog-post
title: Evolution of a farmer-facing chatbot
author: Tanishk Verma
projectId: Samagra X
authorImage: /img/person-vector.jpeg
date: 2025-02-10T07:17:28.061Z
description: Govind, a farmer from Barabanki, Uttar Pradesh, navigates a series
  of decisions every season- choosing the right paddy variety, correctly spacing
  sugarcane seeds, and determining the appropriate pesticide at the right time.
  His productivity and income depend on these decisions, yet access to timely,
  accurate agricultural advice remains a challenge. Traditionally, he relies on
  local knowledge and government extension services through extension workers,
  but with one extension worker supporting over 1,000 farmers, personalized,
  timely, and need-based assistance is scarce.
featuredimage: /img/samagrax-logo.png
---
Govind, a farmer from Barabanki, Uttar Pradesh, navigates a series of decisions every season- choosing the right paddy variety, correctly spacing sugarcane seeds, and determining the appropriate pesticide at the right time. His productivity and income depend on these decisions, yet access to timely, accurate agricultural advice remains a challenge. Traditionally, he relies on local knowledge and government extension services through extension workers, but with one extension worker supporting over 1,000 farmers, personalized, timely, and need-based assistance is scarce.


Like many farmers, Govind has received advisory messages and calls meant to bridge this information gap. However, these are often generic, repetitive, and not specific to his land, crop cycle, or immediate concerns. As a result, he has struggled with issues like unexpected pest infestations and erratic weather, leading to significant crop losses.


Recognizing these challenges, governments have experimented with various solutions—call centers, SMS advisories, and mobile apps—but these often fall short in providing real-time, interactive, and tailored support. This is where AI-driven advisory chatbots present a new opportunity: offering precise recommendations, scheme awareness, and real-time support, all in local languages.''


**Why Chatbots?**


Chatbots in GovTech are helping citizens access accurate and timely information on government services. Designed flexibly, they can be updated and expanded over time, serving as test projects for automating and improving government service delivery. In the agricultural sector, where departments struggle to support farmers at scale, AI-driven bots offer real-time, contextual guidance on crops, weather, and government schemes—empowering farmers like Govind with the right information when they need it.


These AI-driven bots serve as a starting point, demonstrating how automation can make government support more accessible and efficient. By addressing real needs at scale, they pave the way for broader digital governance solutions that truly empower citizens.
Understanding this potential, our team set out to develop a state-specific chatbot tailored to farmers’ unique needs, addressing the widespread issue of information asymmetry. The goal was to create an advisory system that would deliver relevant, actionable, and trustworthy recommendations while ensuring scalability.''


**The Beginning of the Journey**


The release of ChatGPT in November 2022 by OpenAI significantly expanded the possibilities of conversational AI, particularly for governance applications. We began exploring how this technology could support farmer advisory, starting with experiments at the Krushi Odisha Mela and early iterations of fine-tuning GPT models for agriculture-specific use cases.


The first Proof of Concept (PoC), [Ama Krushi AI](https://www.youtube.com/watch?v=9IqHxxXlQTE), validated the potential of AI-powered advisory in agriculture and laid the foundation for Samagra’s Gov.AI mission. In April 2024, we launched an initiative to develop an agricultural advisory chatbot as a Minimum Viable Product (MVP), incorporating learnings from our work in Uttar Pradesh and Odisha.


Govind's story mirrors the experiences of thousands of farmers in these states—struggling with inconsistent access to information, experimenting with existing advisory mechanisms, and ultimately lacking a reliable, interactive source of real-time guidance. This chatbot aimed to change that.


**Building an AI Advisory Model for Farmers**


Unlike general-purpose AI models, domain-specific agriculture-focused chatbots require specialized training to ensure accuracy, relevance, and ease of use for farmers. To develop an effective chatbot, we focused on two critical dimensions: [Reference article ](https://platform.openai.com/docs/guides/optimizing-llm-accuracy/llm-optimization-context)

![](/img/rag-1.png)

Fig 1: Decision matrix for AI adoption for organizations


1. Context Optimization – Ensuring responses are relevant by integrating external data sources such as government advisories, weather updates, and local agronomic practices.


2. LLM Optimization – Improving the chatbot’s ability to understand and respond to user queries through techniques like fine-tuning, prompt engineering, and retrieval-augmented generation (RAG).


Instead of fine-tuning a model—an expensive and resource-heavy process—we prioritized the RAG approach, where the chatbot fetches answers from a curated database before processing them through GPT for a user-centric response. If a direct match is unavailable, the query is handled by the base AI model, ensuring a balance between accuracy and adaptability. In essence, the key difference in approach is to not essentially take AI to citizens but deliver trusted information to citizens using AI. 

For Govind, this meant that instead of receiving generic SMS messages, he could now ask the chatbot specific questions about paddy cultivation or sugarcane spacing and get responses tailored to his location, soil conditions, and current season.


**Challenges and Iterations**


Our initial MVP approach focused on creating chatbot prototypes in two states, testing basic advisory functions before expanding to more complex capabilities. While the chatbots could answer factual, relevant, and exhaustive questions, their accuracy initially hovered just above 50%—a modest but promising start.


However, internal testing by agricultural experts revealed key shortcomings:


1. Intent Detection Issues: The chatbot struggled to accurately classify queries (e.g., differentiating between a general agriculture question and a pest-related issue).


2. Limited Personalization: The chatbot did not always provide location-specific advice structured by crops, seasons, and soil types.


3. Department Expectations: The government sought a more advanced solution capable of handling procurement dealer queries and weather-based crop advisory, beyond just agronomic recommendations.



![](/img/rag-2.jpg)

Fig 2: Illustration of initial architecture of the proposed product

**Rethinking the Approach**


To address these challenges, we redesigned the chatbot’s logic and data pipeline, focusing on three key areas:

1. Improving Intent Classification
   - Augmented training datasets to enhance query classification.
   - Introduced a hierarchical classification system to improve accuracy.
   - Pivoted to a hybrid approach, using OpenAI’s GPT for initial intent detection and BERT for stage-two refinement.

     
2. Enhancing Personalization
   - Implemented dynamic location recognition, ensuring that advisory content was relevant to a farmer’s specific district.
   - Tagged advisory content with additional filters (crop name, location, season, and farming stage) to deliver more precise recommendations.
   - Integrated a knowledge graph to improve how the chatbot structured its responses.     

   For Govind, this meant that instead of receiving generic pesticide guidance, he could get recommendations tailored to his exact paddy variety, the current growth stage, and recent weather conditions .       
3. Expanding Features Based on Farmer Needs
   - Developed a weather advisory module, updating daily in sync with IMD advisories.
   - Added a dealer locator feature, allowing farmers to find the nearest suppliers based on their location.
   - Scoped further farmer database integration, allowing for even greater personalization in future versions.




**Final Learnings and Impact**


Over six months, our team refined AI models, optimized data pipelines, and enhanced system logic—resulting in a chatbot with 95% accuracy. Built on the RAG framework, it delivers precise, contextual advisory while ensuring scalability and trust.

![](/img/rag-3.jpg)

Fig 3: Illustration of final architecture of the product


For farmers like Govind, this chatbot represents a fundamental shift in how they access and use agricultural advisory. Instead of waiting for extension worker visits or relying on one-size-fits-all SMS alerts, they now have real-time access to accurate, localized, and actionable information at their fingertips.


This journey marks a significant step in AI-driven governance. By addressing adoption challenges, refining chatbot capabilities, and ensuring ease of use, conversational AI can evolve into a scalable, citizen-centric solution—reshaping public service delivery and empowering communities at scale.