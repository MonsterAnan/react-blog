import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  InputLabel,
  Select,
  MenuItem,
  Switch,
  TextField,
  FormControlLabel,
  Button,
} from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
import { DateTimePicker } from "@material-ui/pickers";
import { toast } from "react-toastify";
import { useForm, Controller } from "react-hook-form";
// api
import { updateArticleOne } from "api/article";

// style
const useStyles = makeStyles((theme) => ({
  title: {
    textAlign: "center",
    margin: "20px 0",
  },
  form: {
    minWidth: 200,
    maxWidth: 800,
    width: "100%",
  },
  formControl: {
    margin: theme.spacing(2, 0),
    width: "100%",
    position: "relative",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  publish: {
    marginTop: 10,
    textAlign: "right",
  },
  visible: {
    color: "rgba(0, 0, 0, 0.54)",
  },
  formLabel: {
    color: "rgba(0, 0, 0, 0.54)",
    marginBottom: 10,
    fontSize: ".785rem",
  },
}));

const names = [
  "HTML",
  "CSS",
  "JavaScript",
  "React Native",
  "Material-UI",
  "Ant Design",
  "Vue",
  "React",
  "Webpack",
  "Babel",
  "Nginx",
  "Docker",
  "Travis CI",
  "Angular",
  "计算机网络",
];
export default function AboutMe(props) {
  const classes = useStyles();
  
  const { control, handleSubmit, errors } = useForm({
    defaultValues: props.currentData
      ? { ...props.currentData }
      : {
          type: "",
          html: "",
          title: "",
          cover: "",
          toc:"",
          markdown: "",
          github: "",
          desc: "",
          level: "",
          isVisible: true,
          releaseTime: new Date(),
          source: "",
          tag: [],
        },
  });

  const onSubmit = (data) => {
    publishArtocle(data);
  };

  const publishArtocle = (data) => {
    updateArticleOne(props.currentData._id, data).then((res) => {
        if (res && res.code === 1) {
          toast("修改成功!");
          props.closeDrawer();
        }
      });
  };
  
  return (
    <form className={classes.form} onSubmit={handleSubmit(onSubmit.bind(this))}>
      <h3 className={classes.title}>更新个人信息</h3>

      <section className={classes.formControl}>
        <InputLabel shrink>文章类型*</InputLabel>
        <Controller
          as={
            <Select displayEmpty>
              <MenuItem value="" disabled>
                选择文章类型
              </MenuItem>
              {names.map((name) => (
                <MenuItem key={name} value={name}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          }
          required
          rules={{ required: true }}
          fullWidth
          name="type"
          control={control}
        />
        {errors.type && <span>This field is required</span>}
      </section>
      <section className={classes.formControl}>
        <Controller
          as={TextField}
          name="title"
          required
          autoFocus
          InputLabelProps={{
            shrink: true,
          }}
          label="标题"
          placeholder="请输入标题"
          fullWidth
          control={control}
        />
      </section>
      <section className={classes.formControl}>
        <Controller
          as={TextField}
          name="cover"
          autoFocus
          InputLabelProps={{
            shrink: true,
          }}
          label="封面"
          placeholder="请输入封面地址"
          fullWidth
          control={control}
        />
      </section>
      <section className={classes.formControl}>
        <Controller
          as={TextField}
          multiline
          rows={4}
          name="desc"
          required
          autoFocus
          InputLabelProps={{
            shrink: true,
          }}
          label="描述"
          placeholder="请输入描述"
          fullWidth
          control={control}
        />
      </section>

      <section className={classes.formControl}>
        <div component="ul" className={classes.chipRoot}>
          <Controller
            as={TextField}
            autoFocus
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
            label="标签"
            placeholder="请输入标签(使用逗号分隔)"
            name="tag"
            required
            control={control}
          />
        </div>
      </section>
  
      <section className={classes.formControl}>
        <Controller
          as={TextField}
          required
          label="级别"
          placeholder="请输入级别"
          fullWidth
          name="level"
          control={control}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </section>
      <section className={classes.formControl}>
        <Controller
          as={TextField}
          required
          label="来源"
          placeholder="请输入来源"
          fullWidth
          name="source"
          InputLabelProps={{
            shrink: true,
          }}
          control={control}
        />
      </section>
      <section className={classes.formControl}>
        <Controller
          as={TextField}
          label="Github"
          placeholder="请输入Github"
          fullWidth
          name="github"
          InputLabelProps={{
            shrink: true,
          }}
          control={control}
        />
      </section>
      <section className={classes.formControl}>
        <Controller
          render={(props) => (
            <DateTimePicker
              onChange={(e) => {
                props.onChange((props.value = e.format()));
              }}
              value={props.value}
              variant="inline"
              label="发布时间"
            />
          )}
          required
          name="releaseTime"
          InputLabelProps={{
            shrink: true,
          }}
          control={control}
        />
      </section>
      <section className={(classes.formControl, classes.visible)}>
        <FormControlLabel
          control={
            <Controller
              render={(props) => (
                <Switch
                  onChange={(e) => props.onChange(e.target.checked)}
                  checked={props.value}
                />
              )}
              name="isVisible"
              control={control}
            />
          }
          label="是否可见"
        />
      </section>
      <section className={classes.publish}>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          endIcon={<SendIcon />}
          type="submit"
        >
          立即更新
        </Button>
      </section>
    </form>
  );
}
