import express from 'express'
const cors = require('cors')
import {createHandler} from "graphql-http/lib/use/express";
import {course_schema} from "./schemas/course-schema";

// @ts-ignore
import {Prisma, PrismaClient} from "./prisma/app/generated/prisma/client"
import AssignmentGroupUncheckedCreateWithoutCourseInput = Prisma.AssignmentGroupUncheckedCreateWithoutCourseInput;
import CourseUncheckedCreateInput = Prisma.CourseUncheckedCreateInput;
import AssignmentUncheckedCreateInput = Prisma.AssignmentUncheckedCreateInput;
import SubmissionUncheckedCreateInput = Prisma.SubmissionUncheckedCreateInput;
import SubmissionCommentUncheckedCreateInput = Prisma.SubmissionCommentUncheckedCreateInput;

const prisma = new PrismaClient({
    log: ['info', 'warn', 'error']
})
const app = express()

app.use(express.json())
app.use(cors())

app.all(
    '/graphql',
        createHandler({
            schema: course_schema
        })
)

// @ts-ignore
app.post('/courses', async (req, res) => {
    if (req.body !== undefined && req.body !== null) {
        const body = await req.body
        const courses = body.courses
        const results = await Promise.all(courses.map(async (course) => {
            let course_date_statistics: {
                id: number
                avg_num_assignments_due_per_day: number
                avg_time_assigned_to_due: string
                avg_time_last_past_due: string
                avg_time_last_to_grade: string
                avg_num_late: number
                avg_submissions: number
            }
            let course_score_statistics: {
                id: number
                min: number
                max: number
                mean: number
                upper_q: number
                median: number
                lower_q: number
            }
            if (course.date_statistics !== undefined) {
                course_date_statistics = await prisma.dateStatistics.create({
                    data: {
                        avg_num_assignments_due_per_day: course.date_statistics.avg_num_assignments_due_per_day,
                        avg_time_assigned_to_due: course.date_statistics.avg_time_assigned_to_due,
                        avg_time_last_past_due: course.date_statistics.avg_time_last_past_due,
                        avg_time_last_to_grade: course.date_statistics.avg_time_last_to_grade,
                        avg_num_late: course.date_statistics.avg_num_late,
                        avg_submissions: course.date_statistics.avg_submissions
                    }
                })
            }
            if (course.score_statistics !== undefined) {
                course_score_statistics = await prisma.scoreStatistic.create({
                    data: {
                        min: course.score_statistics.min,
                        max: course.score_statistics.max,
                        mean: course.score_statistics.mean,
                        upper_q: course.score_statistics.upper_q,
                        median: course.score_statistics.median,
                        lower_q: course.score_statistics.lower_q
                    }
                })
            }
            const course_input: CourseUncheckedCreateInput = {
                id: course.id,
                name: course.name,
                course_code: course.course_code,
                start_at: course.start_at,
                end_at: course.end_at,
                total_students: course.total_students,
                date_statistics_id: course_date_statistics !== undefined && course_date_statistics.id !== undefined ? course_date_statistics.id : undefined,
                score_statistics_id: course_score_statistics !== undefined && course_score_statistics.id !== undefined? course_score_statistics.id :undefined,
                points_possible: course.points_possible,
                weight: course.weight
            }
            const course_result = await prisma.course.create({
                data: course_input
            })
            // console.log(`Course: ${course.id}: Assignment Groups: ${course.assignmnet_groups}`)
            if (course.assignment_groups !== undefined) {
                const assignment_groups_result = await Promise.all(course.assignment_groups.map(async (assignment_group) => {
                    let assignment_group_date_statistics: {
                        id: number
                        avg_num_assignments_due_per_day: number
                        avg_time_assigned_to_due: string
                        avg_time_last_past_due: string
                        avg_time_last_to_grade: string
                        avg_num_late: number
                        avg_submissions: number
                    }
                    let assignment_group_score_statistics: {
                        id: number
                        min: number
                        max: number
                        mean: number
                        upper_q: number
                        median: number
                        lower_q: number
                    }
                    if (assignment_group.date_statistics !== undefined) {
                        assignment_group_date_statistics = await prisma.dateStatistics.create({
                            data: {
                                avg_num_assignments_due_per_day: assignment_group.date_statistics.avg_num_assignments_due_per_day,
                                avg_time_assigned_to_due: assignment_group.date_statistics.avg_time_assigned_to_due,
                                avg_time_last_past_due: assignment_group.date_statistics.avg_time_last_past_due,
                                avg_time_last_to_grade: assignment_group.date_statistics.avg_time_last_to_grade,
                                avg_num_late: assignment_group.date_statistics.avg_num_late,
                                avg_submissions: assignment_group.date_statistics.avg_submissions
                            }
                        })
                    }
                    if (assignment_group.score_statistics !== undefined) {
                        assignment_group_score_statistics = await prisma.scoreStatistic.create({
                            data: {
                                min: assignment_group.score_statistics.min,
                                max: assignment_group.score_statistics.max,
                                mean: assignment_group.score_statistics.mean,
                                upper_q: assignment_group.score_statistics.upper_q,
                                median: assignment_group.score_statistics.median,
                                lower_q: assignment_group.score_statistics.lower_q
                            }
                        })
                    }
                    const assignment_group_data: AssignmentGroupUncheckedCreateWithoutCourseInput = {
                        id: assignment_group.id,
                        name: assignment_group.name,
                        position: assignment_group.position,
                        group_weight: assignment_group.group_weight,
                        points_possible: assignment_group.points_possible,
                        score_statistics_id: assignment_group_score_statistics !== undefined && assignment_group_score_statistics.id !== undefined ? assignment_group_score_statistics.id : undefined,
                        date_statistics_id: assignment_group_date_statistics !== undefined && assignment_group_date_statistics.id !== undefined ? assignment_group_date_statistics.id : undefined
                    }
                    const assignment_group_result = await prisma.assignmentGroup.create({
                        data: assignment_group_data
                    })
                    await prisma.course.update({
                        data: {
                            assignment_groups: {
                                connect: {id: assignment_group_result.id}
                            }
                        },
                        where: {
                            id: course_result.id
                        }
                    })
                    if (assignment_group.assignments !== undefined) {
                        await Promise.all(assignment_group.assignments.map(async (assignment) => {
                            let assignment_score_statistics: {
                                id: number
                                min: number
                                max: number
                                mean: number
                                upper_q: number
                                median: number
                                lower_q: number
                            }
                            if (assignment.score_statistics !== undefined) {
                                assignment_score_statistics = await prisma.scoreStatistic.create({
                                    data: {
                                        min: assignment.score_statistics.min,
                                        max: assignment.score_statistics.max,
                                        mean: assignment.score_statistics.mean,
                                        upper_q: assignment.score_statistics.upper_q,
                                        median: assignment.score_statistics.median,
                                        lower_q: assignment.score_statistics.lower_q
                                    }
                                })
                            }
                            const assignment_data: AssignmentUncheckedCreateInput = {
                                id: assignment.id,
                                name: assignment.name,
                                description: assignment.description,
                                updated_at: assignment.updated_at,
                                due_at: assignment.due_at,
                                unlock_at: assignment.unlock_at,
                                course_id: assignment.course_id,
                                assignment_group_id: assignment.assignment_group_id,
                                position: assignment.position,
                                points_possible: assignment.points_possible,
                                submission_types: assignment.submission_types.join(' | '),
                                has_submitted_submissions: assignment.has_submitted_submissions,
                                published: assignment.published,
                                quiz_id: assignment.quiz_id,
                                anonymous_submissions: assignment.anonymous_submissions,
                                use_rubric_for_grading: assignment.use_rubric_for_grading,
                                allowed_attempts: assignment.allowed_attempts,
                                is_quiz_assignment: assignment.is_quiz_assignment,
                                last_submission_date: assignment.last_submission_date,
                                last_graded_date: assignment.last_graded_date,
                                num_late_submissions: assignment.num_late_submissions,
                                avg_submissions_per_user: assignment.avg_submissions_per_user,
                                avg_submission_time: assignment.avg_submission_time,
                                avg_time_to_grade: assignment.avg_time_to_grade,
                                score_statistics_id: assignment_score_statistics !== undefined && assignment_score_statistics.id !== undefined ? assignment_score_statistics.id : undefined
                            }
                            const assignment_result = await prisma.assignment.create({
                                data: assignment_data
                            })
                            await prisma.assignmentGroup.update({
                                data: {
                                    assignments: {
                                        connect: {id: assignment_result.id}
                                    }
                                },
                                where: {
                                    id: assignment_group_result.id
                                }
                            })
                            if (assignment.submissions !== undefined) {
                                await Promise.all(assignment.submissions.map(async (submission) => {
                                    const submission_data: SubmissionUncheckedCreateInput = {
                                        assignment_id: submission.assignment_id,
                                        attempt: submission.attempt,
                                        body: submission.body,
                                        score: submission.score,
                                        submitted_at: submission.submitted_at,
                                        user_id: submission.user_id,
                                        late: submission.late,
                                        excused: submission.excused,
                                        missing: submission.missing,
                                        late_policy_status: submission.late_policy_status,
                                        anonymous_id: submission.anonymous_id,
                                        time_late: submission.time_late,
                                        time_to_grade: submission.time_to_grade,
                                    }
                                    const submission_result = await prisma.submission.create({
                                        data: submission_data
                                    })
                                    await prisma.assignment.update({
                                        data: {
                                            submissions: {
                                                connect: {id: submission_result.id}
                                            }
                                        },
                                        where: {
                                            id: assignment_result.id
                                        }
                                    })
                                    if (submission.submission_comments !== undefined) {
                                        await Promise.all(submission.submission_comments.map(async (submission_comment) => {
                                            const submission_comment_data: SubmissionCommentUncheckedCreateInput = {
                                                id: submission_comment.id,
                                                submission_id: submission_result.id,
                                                author_name: submission_comment.author_name,
                                                comment: submission_comment.comment,
                                                created_at: submission_comment.created_at,
                                                edited_at: submission_comment.edited_at
                                            }
                                            const submission_comment_result = await prisma.submissionComment.create({
                                                data: submission_comment_data
                                            })
                                            await prisma.submission.update({
                                                data: {
                                                    submission_comments: {
                                                        connect: {id: submission_comment_result.id}
                                                    }
                                                },
                                                where: {
                                                    id: submission_result.id
                                                }
                                            })
                                            return submission_comment_result
                                        }))
                                    }
                                    if (assignment.low_submission !== undefined && assignment.low_submission.user_id === submission_result.user_id && assignment.low_submission.attempt === submission_result.attempt) {
                                        const assignment_low_submission_result = await prisma.assignment.update({
                                            data: {
                                                low_submission: {
                                                    connect: {id: submission_result.id}
                                                }
                                            },
                                            where: {
                                                id: assignment_result.id
                                            }
                                        })
                                    }
                                    if (assignment.median_submission !== undefined && assignment.median_submission.user_id === submission_result.user_id && assignment.median_submission.attempt === submission_result.attempt) {
                                        const assignment_median_submission_result = await prisma.assignment.update({
                                            data: {
                                                median_submission: {
                                                    connect: {id: submission_result.id}
                                                }
                                            },
                                            where: {
                                                id: assignment_result.id
                                            }
                                        })
                                    }
                                    if (assignment.high_submission !== undefined && assignment.high_submission.user_id === submission_result.user_id && assignment.high_submission.attempt === submission_result.attempt) {
                                        const assignment_high_submission_result = await prisma.assignment.update({
                                            data: {
                                                high_submission: {
                                                    connect: {id: submission_result.id}
                                                }
                                            },
                                            where: {
                                                id: assignment_result.id
                                            }
                                        })
                                    }
                                    return submission_result
                                }))
                            }
                            return assignment_result
                        }))
                    }
                    return assignment_group_result
                }))
            }
            return course_result
        }))
        console.log(results)
        return res.status(200).json()
    } else {
        console.log('Bad request')
        return res.status(400).json()
    }
})

console.log('Listening on port 4000...')
app.listen(4000)
