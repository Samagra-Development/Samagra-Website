---
templateKey: blog-post
title: "When No Pest Becomes the Problem: Rethinking Pest Surveillance in Maharashtra"
author: Garv Jain
projectId: "1234"
authorImage: /img/garv.jpg
date: 2026-08-07T13:17:59.701Z
description: "Garv explores the problem of detecting no pests in agriculture and
  how that is often a signal of something going wrong rather than a system that
  is working. He takes us through the journey of identifying the issues,
  coordinating with stakeholders and how Samagra along with the Government of
  Maharashtra came up with Cropsap 2.0 to improve upon the systems that existed,
  "
featuredimage: /img/blog-feature-20-.png
---
<!--StartFragment-->

It was winter in Nagpur, the season when the state legislature moves east and the whole machinery of government follows it across Maharashtra. And something had begun to bother the Additional Chief Secretary for Agriculture and the Project Director of PoCRA — the state's flagship climate-resilient agriculture project. The newspapers were carrying reports of pest infestations across the state. Their own surveillance records were not. When the press knows about an outbreak before your own reporting system does, something has stopped working  and so, between assembly sessions, they went out to the fields to see for themselves.

It wasn’t an outbreak they found, it was silence.

Farmers in village after village were describing pest attacks on their crops — chewed leaves, damaged pods, the familiar dread of a season slipping away. But the official surveillance records for those same villages said something else entirely. They said nothing was wrong. Nil. No incidence.

Somewhere between the field and the file, the pest had disappeared.

That gap is more dangerous than it sounds. In a system built to catch outbreaks early, silence is ambiguous. A clean record can mean "we checked, and there is genuinely no pest here"  or "nobody checked, or nobody reported what they saw." Those are opposite situations, and the state's records could not tell them apart. For a state with 1.5 crore farmers across 34 districts, growing eight major crops, watched over by 14,000 field officers, that ambiguity was the difference between catching an outbreak in time and reading about it after the harvest was lost.

The question that came back from Nagpur was: how do you build a system that can tell the difference between good news and no news? And this is a question that eventually made its way to our desks.

## A system that had done its job for a decade

The system was called CROPSAP, and it is worth being fair to it. For its time, it was genuinely ahead of the curve - running across the entire state, through both the kharif and rabi seasons, organising thousands of field officers to survey crops week after week. Long before "real-time data" became a fashionable phrase in governance, Maharashtra had built a structured, statewide machine for watching its fields.

But one assumption sat deep in its design, and it had quietly stopped holding. CROPSAP assumed the officer's report was the only signal that mattered — that a single person, walking a single field, would see the pest, write it down, and pass it up the chain. That is reasonable when there is no other way of knowing what is happening in a field. It is fragile the moment that single voice goes quiet. And there were many entirely human reasons for it to go quiet  which is what we set out to understand.

## Pulling the problem apart

We began by asking why the system was failing. We sat down with the then Project Director of PoCRA, now Principal Secretary for Agriculture, and pulled the problem apart branch by branch.

The root question: why were serious pest incidents - the ones bad enough to threaten a farmer's yield - not reaching the system? There turned out to be five places along the journey where a real pest could vanish from the record. We laid them out as hypotheses to test:

1. The survey doesn't happen as it should — not at the right frequency, not on well-chosen plots, not sampled correctly
2. The pest isn't seen for what it is — officers aren't always equipped to spot it, judge its severity, or use the tools that are meant to help
3. There's a reason not to report it — the survey is tedious, the follow-up work is tedious and lands on the very same officer, so honesty quietly costs more than silence
4. Nothing catches the miss — no mechanism exists to flag when a report doesn't match reality

Five failure points  and a pest incident had to survive all five to become a number someone could act on. This is simply how we work at Samagra: you cannot understand a system from a conference room. So we took each branch to the field and tested it against what officers and farmers actually told us, keeping what held up and changing our minds where it did not.

![Validating hypotheses on the ground - field visit with agriculture officers, Feb, 2026](/img/screenshot-2026-08-07-195503.png "Validating hypotheses on the ground - field visit with agriculture officers, Feb, 2026")

*Validating hypotheses on the ground - field visit with agriculture officers, Feb, 2026*

<!--StartFragment-->

## Three kinds of failure

What we found sorted into three major problems clubbing several validated hypothesis:

1. The incentive problem

The deepest wasn't about technology at all. It was about incentives. From a field officer's point of view: report a serious pest problem, and your reward was more work — a follow-up visit, paperwork on a deadline, questions from seniors. Report that everything was fine, and your reward was nothing. Silence cost less than honesty did. When a system punishes the truth and rewards the convenient answer, you cannot fix it by asking people to try harder — you have to change what the truth costs.

2. The design problem

The system had one source of information and nothing to check it against. The plots officers surveyed were fixed and known in advance, so they could be anticipated. And there was no way to tell "I checked and found nothing" from "I did not really check." A single voice, with no second opinion, reporting into a system that had to simply trust it.

3. The technology problem

The old app was clunky, worked only online, could not prove where an officer had been, stored no photographs, and had no way to get advice back to the farmer directly. It mattered enormously — but it could only do its job sitting on top of the right incentives and the right design. Start with the technology alone, as most reform efforts do, and you get a beautiful new app faithfully recording the same silences as before.

## Designing the fix

The principle we kept returning to: honest reporting should not be something we ask officers to do out of goodwill. It should be something the system needs in order to work — so that telling the truth becomes the natural path, not the noble one.

The heart of the redesign was corroboration. Instead of relying on the officer's report alone, the system now checks it against three independent sources. There are the farmers themselves, who can report pest activity directly through MahaVistaar — the state's existing platform that farmers already use to receive agricultural advice and alerts. There is a web crawler that scans news and online sources for outbreaks. And there is a weather-based model that predicts where pests are likely to appear, since pests follow weather.

Put those together and something quietly powerful happens. If a farmer is reporting an infestation, the news is mentioning it, and the weather model is predicting it — but the officer's survey for that village says nil — the system notices the contradiction and raises a flag. It is not watching any single officer. It is watching for patterns that do not add up. Honesty stops being a moral appeal and becomes the only version of events where all four signals agree.

One decision I want to dwell on, because it is where good governance and good engineering meet: we did not build new technology where the state already owned some. MahaVistaar already had a feature that could identify a pest from a photograph, and the state already had a weather-based prediction engine. Rather than commission shiny new versions, we plugged into what existed. Far less glamorous than announcing a brand-new AI, and far more sensible.

Around this core, we changed the survey itself. The system now assigns officers random plots they cannot predict. Surveys must happen in a defined window, because there are hours when pests simply are not visible on the plant and a survey done at the wrong time sees nothing real. Every observation carries a location-stamped photograph. And when a genuine problem is found, advice flows automatically back to the farmer, in Marathi, the same day.

Alongside the app, we are building a comprehensive dashboard — a live map of the state showing pest infestation as it is reported, district by district and village by village. A decision-maker in the state headquarters should be able to see an outbreak building in the same hours an officer is discovering it, rather than weeks later in a report. It is still under development, but it is the piece that turns thousands of individual surveys into a single, watchable picture of the state's crops.

The quiet revolution in all of this is where the farmer ends up. In the old system, the farmer sat at the very end of the chain — the last to know, if they were told at all. Now their own report is one of the four signals the whole system listens to. They moved from the end of the chain to the centre of it.

## Three months

Then the timeline arrived, and it rearranged everything.

The Principal Secretary decided the system should be launched by the Chief Minister himself. A commitment of that stature carries real weight — it signals the government is serious and puts the full attention of the state behind the change. It also meant we needed a working field application, built through a government vendor, in three months.

I will be honest about how that landed. Three months, for a system this involved, was not a stretch target — by every conventional measure, it was not enough time. There is a particular feeling that comes with a deadline like that: a first reaction that it is simply impossible, then the realisation that "impossible" is not an answer you get to give, and then a strange, focusing clarity once you accept that the only way through is through.

What it took was a mission mode of working: short cycles, several things built at once, a willingness to ship something imperfect and fix it in the field. That part, we expected. What I did not expect was where the real ownership would come from, a champion several rungs down the ladder, brought into the effort right from the start, who took it on as if it were her own. The Joint Director of Agriculture (Extension & Training) became the reason the timeline held — not by approving things from above, but by clearing small obstacles before they grew into large ones, coordinating testing across sixty field officers, simply caring that it got built on time. Efforts like this are described in terms of the senior leaders who back them. They are usually delivered by someone three levels below, whose name rarely appears anywhere.

## Launched before it was finished

And then it launched, before it was finished.

What existed by the launch date was a minimum viable product: the core of the system, working, but not the whole of it. The Chief Minister announced CROPSAP 2.0, committed to a rollout, and spoke about it publicly, while behind the scenes the work was still very much alive. Field testing was ongoing. Bugs were surfacing and getting fixed in real time, many of them in a WhatsApp group of sixty officers testing the app across the state, where a login failure in one district or a wrong dropdown in another would get flagged, discussed, and patched. The dashboard was still being built. What went live was enough to prove the idea and start the rollout — not the finished article.

It would be easy to read that as recklessness. I have come to see it differently. A public commitment from the very top does something an internal deadline never can: it turns work that could silently slip, or be shelved, or lose its momentum, into an obligation that has to be met. The launch did not mean the work was done. It meant the work could no longer be abandoned  which, in a government context, is often what separates the ideas that reach the field from the ones that stay forever "in progress."

![With the Joint Director of Agriculture (Extension) at the CROPSAP 2.0 launch, during the Kharif Preparation Meeting 2026 chaired by the Hon'ble CM of Maharashtra](/img/screenshot-2026-08-07-195456.png "With the Joint Director of Agriculture (Extension) at the CROPSAP 2.0 launch, during the Kharif Preparation Meeting 2026 chaired by the Hon'ble CM of Maharashtra")

*With the Joint Director of Agriculture (Extension) at the CROPSAP 2.0 launch, during the Kharif Preparation Meeting 2026 chaired by the Hon'ble CM of Maharashtra*

<!--EndFragment-->

<!--StartFragment-->

## Where it stands

CROPSAP 2.0 is now live for the kharif season. It is early, and we are watching it carefully, and trying to be honest about what it can and cannot yet do.

Even a well-designed system has blind spots. The hardest case is not the officer who lies. Corroboration is built to catch that. It is the officer who tells the truth and is still wrong: who reaches a field at the wrong hour, genuinely sees no pest because the pests are not visible then, and files an honest "nil" for a plot that is actually in trouble. No amount of cross-checking catches an honest mistake that nothing else contradicts — only timing and training do. And the system, for all its four signals, is best at catching the misses that something else disagrees with. The outbreak that no farmer reported, no news mentioned, and no model predicted can still, in principle, slip through. Naming that honestly matters more than pretending it away.

But here is what I keep coming back to. We started out thinking the job was to build a better system for detecting pests. Somewhere along the way, the problem changed shape in front of us. The real job was never to build a smarter system to detect pests.

It was to build a system where telling the truth was the easiest thing to do.

<!--EndFragment-->

<!--EndFragment-->