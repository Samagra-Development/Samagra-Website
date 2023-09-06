---
templateKey: blog-post
title: Sprinting with GitHub
author: Karan Trehan
projectId: SamagraX
authorImage: /img/karan-trehan.jpg
date: 2023-09-06T08:51:56.168Z
description: N/A
featuredimage: /img/github-karan-featured-photo.jpeg
---
At SamagraX, we set out to manage the code of our multiple open-source projects and their sprints on [GitHub](https://github.com/) some six months ago. We did this to make the development process uniform as well as simpler for our engineers, to keep our project roadmaps public and make it easier to contribute to our projects. All of this while getting the benefits that two-week [well-run sprints](https://nemethgergely.com/blog/playbook-for-running-sprints) have to offer. This blog is for you if you too are managing your code base on GitHub - open or closed source & looking to use GitHub to manage your development tickets via sprints or otherwise. This blog talks about our motivation, setup, experience and takeaways. By the end of this blog you will know if GitHub Projects is the right method for you to manage your sprints.

**Motivation**

At SamagraX (Samagra's GovTech and DataGov vertical), we are building the next-gen, federated, privacy-aware, interoperable platforms that will impact the lives of millions of citizens across the country & the globe. We are constantly experimenting with open-source technologies and processes to create reusable technology components and deploy products at scale in the Indian governance ecosystem. One of our engineering principles is to be open-source by default. Whatever we write is in the [open & contributed](https://github.com/Samagra-Development) to the public domain. Almost all of our platforms, systems & solutions have their source code on GitHub. We also actively contribute to other open-source projects to [enhance](https://github.com/Samagra-Development/odk-collect-extension) them.

In the past, [requirement gathering](https://www.jamasoftware.com/requirements-management-guide/requirements-gathering-and-management-processes/what-is-requirements-gathering) for us was done on Google Sheets. These requirements were detailed to some extent, prioritised & shared with the engineering team in 2 / 4 week cycles across different programs. The structure of these requirements was also not uniform. The engineering teams were sparingly using GitHub issues to log our change requests, bugs, enhancements and tag our commits with the issues.

![](/img/image-1.png)

This approach served us well for some time but had the following four issues:

1. _Requirement details were not uniform across programs_ - At SamagraX, we work on multiple programs in parallel. At a time there could be upto 5 programs being worked on by the engineering teams. Each program has its own program team (onground implementation team), product managers and an engineering team / pod. With each program collecting requirements individually, each of them also had their own format with some being more detailed than others for engineering. This led to issues when engineers shifted from one program to another.
2. _Duplication of efforts_ - Program teams were submitting requirements which were translated by product managers into the sheets. These translated product requirements were then copy-pasted / duplicated by engineers into GitHub as issues. This particular step was also getting skipped at times with no issues being created for certain requirements.
3. _Tracking progress was hard_ - Engineering teams would push, review, merge and release code for testing. The product managers would have to track all the different requirements being worked upon and update their sheets. This led to issues when product managers were managing multiple programs or were out-of-office for a few days.
4. _Different sprint cycles in programs_ - Each program also defined their own sprint cycle. This made it harder for teams across programs to collaborate. Tickets from one program to another would take different periods of time to be picked and worked on.

As we scaled in size and teams, all of the above issues made it pertinent for us to look for solutions.

**GitHub Projects**

We eventually shortlisted two solutions: [Jira](https://www.atlassian.com/software/jira/features) & [GitHub Projects](https://docs.github.com/en/issues/planning-and-tracking-with-projects/learning-about-projects/about-projects). 

Jira has its own fan-following and we had quite a few members in the team who had prior experience working on it. Hence, we started with exploring Jira first. Jira has a great UI and a large gamut of feature sets with [detailed documentation](https://confluence.atlassian.com/jira) around it. Although Jira’s integration with our source code on GitHub was not straightforward. The team also found it an overkill for our current use case of managing sprints.

GitHub Projects was the second option on our list. We use GitHub actions & codespaces extensively in addition to the gamut of source code management tools provided by GitHub. GitHub Projects lacked the maturity of features a tool like Jira has, although it had a very [seamless integration](https://docs.github.com/en/issues/planning-and-tracking-with-projects/learning-about-projects/quickstart-for-projects) with our large open-source code on GitHub across projects. It also made it easy for us to support our open-source contributors. In true spirit of SamagraX, we quickly prototyped with GitHub Projects and decided that its code integration, contributor friendliness but comparatively limited feature set would be enough for our use cases. 

**Setup**

We created two views for our projects. A board view where we keep adding issues to our backlog across repos and a sprint view which focuses on tickets in the current sprint. We created multiple custom fields like “Planned in Sprint”, “Started in Sprint”, “Completed in Sprint”, “Dev Estimate” & “Epic”. We also updated statuses to the following: “To Do”, “In Progress”, “Blocked”, “Ready for Testing”, “Testing” & “Done”. 

![](/img/image-2.png)

The tickets are added by our product team before the start of every sprint. The tickets follow a uniform structure: Description, Need, Acceptance criteria, Priority, Configurations, Telemetry & Designs / Contracts.

![](/img/image-3.png)

Engineers & QAs go through the tickets and add effort estimations. In our fortnightly sprint plannings we go through the tickets based on priorities and dev estimates to plan our upcoming sprint.

![](/img/image-4.png)

GitHub Projects allows us to create insights. We use this to look at the tickets we “Completed in Sprint” to understand dev velocity and improve our estimations.

![](/img/image-5.png)

**Experience**

GitHub Projects has been working very well for us. We piloted with just two programs and now all our programs have adopted it. 

With a uniform structure of the board and templates of tickets, requirement gathering has become simpler for product managers as well as engineers. It has also made it easier for engineers to move across programs and quickly get accustomed to the processes. 

Tickets have also become a great way to maintain progress & learnings on each problem statement. There have been multiple instances where we went back to our tickets to understand how we fixed a similar problem. 

With product managers creating and engineers referring to the same tickets there is no duplication of tickets. Rather tickets are getting groomed better from both product and engineering lens. 

Sprinting with GitHub allows our program teams, product managers, peer engineers & leadership team to check into engineering progress in real time. It has also given a lot of structure to our stand-up calls compared to when we were using sheets. 

With uniformity in board structures, flows and tickets, we also uniformed the sprint cycles. Every program now follows a two-week sprint cycle with the same start and end date. This has been an initiative outside of GitHub Projects but benefited from the uniformity it brought.

**Takeaways**

When we started using GitHub Projects it had a limited feature set, though the tool has been maturing well. The addition of workflows has made it easier to trigger actions when the status of a ticket is changed - for example closing an issue when it is moved to the “Done” status. When we started off we had to manually create our board structure across our different repos and organisations. There was no means to templatise this. This has changed as well and templates can be created and shared. 

Few challenges however that still remain:

* There is no automated way to have the same issue templates across repos and organisations. 
* Getting reports out from GitHub Projects is not very simple. There is no means to extract data out of it for reporting / analysis without having to write custom scripts / actions. 
* Workflows are also currently limited in their functionality. Complex workflows like setting a “Started in Sprint” custom field when a status is changed to “In Progress” is currently not possible to do.

In conclusion, GitHub Projects is a very strong tool that you should surely consider for your projects if you have your source code on GitHub and are looking for a simple ticket & sprint management solution. You should consider Jira if you need more than simple ticket & sprint management like documentation handling, customised reporting etc. At SamagraX, we will be continuing to manage our current projects with GitHub Projects and we really look forward to its enhancements from the amazing team at GitHub.
